class SeatingService
  def initialize(dimensions)
    @max_capacity = max_capacity(dimensions)
    @max_row = max_row(dimensions)
    @seat_blocks = seat_blocks(dimensions)
  end

  def get_seating_arrangement(count)
    fillable_seats, remaining_seats, remaining_people = fill_stats(count)
    {
      seating: @seat_blocks.empty? ? [] : filled_seating(fillable_seats),
      remaining_seats: remaining_seats,
      remaining_people: remaining_people
    }
  end

  private

  def max_capacity(dimensions)
    dimensions.reduce(0) do |sum, dimension|
      sum + (dimension[:rows] * dimension[:columns])
    end
  end

  def max_row(dimensions)
    max_row_block = dimensions.max_by { |dimension| dimension[:rows] }
    max_row_block[:rows]
  end

  def seat_blocks(dimensions)
    dimensions.map do |dimension|
      Array.new(dimension[:rows]) { Array.new(dimension[:columns]) { nil } }
    end
  end

  def fill_stats(count)
    [
      [@max_capacity, count].min,
      [@max_capacity - count, 0].max,
      [count - @max_capacity, 0].max
    ]
  end

  def filled_seating(count)
    aisle_pointer, window_pointer, middle_pointer = seat_type_pointers

    (0..(@max_row - 1)).each do |row_idx|
      @seat_blocks.each_with_index do |block, block_idx|
        next if row_idx >= block.size

        (0..(block[0].size - 1)).each do |idx|
          # middle seat in any blocks
          if idx.positive? && idx < block[0].size - 1
            next if middle_pointer > count

            @seat_blocks[block_idx][row_idx][idx] = middle_pointer
            middle_pointer += 1

          # aisle seats in middle blocks
          elsif block_idx.positive? && block_idx < @seat_blocks.size - 1
            next if aisle_pointer > count

            @seat_blocks[block_idx][row_idx][idx] = aisle_pointer
            aisle_pointer += 1

          # left edge block has window first and aisle last
          elsif block_idx.zero?
            if idx.zero?
              next if window_pointer > count

              @seat_blocks[block_idx][row_idx][idx] = window_pointer
              window_pointer += 1
            else
              next if aisle_pointer > count

              @seat_blocks[block_idx][row_idx][idx] = aisle_pointer
              aisle_pointer += 1
            end

          # right edge block has aisle at first index
          elsif idx.zero?
            next if aisle_pointer > count

            @seat_blocks[block_idx][row_idx][idx] = aisle_pointer
            aisle_pointer += 1

          # right edge block has window at last idx
          else
            next if window_pointer > count

            @seat_blocks[block_idx][row_idx][idx] = window_pointer
            window_pointer += 1
          end
        end
      end
    end

    @seat_blocks
  end

  def seat_type_pointers
    window_count = window_seats_count
    middle_count = middle_seats_count
    aisle_count = @max_capacity - window_count - middle_count

    [1, aisle_count + 1, @max_capacity - middle_count + 1]
  end

  def window_seats_count
    if @seat_blocks.size > 1
      edge_window_seats_count(@seat_blocks.first) + edge_window_seats_count(@seat_blocks.last)
    elsif @seat_blocks[0].empty?
      0
    else
      @seat_blocks[0].size * [@seat_blocks[0][0].size, 2].min
    end
  end

  def edge_window_seats_count(block)
    block.first&.size&.positive? ? block.size : 0
  end

  def middle_seats_count
    @seat_blocks.reduce(0) do |total, block|
      total + (block.size * [block[0].size - 2, 0].max)
    end
  end
end
