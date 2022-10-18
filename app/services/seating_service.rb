class SeatingService
  def initialize(dimensions)
    @max_capacity = max_capacity(dimensions)
    @max_row = max_row(dimensions)
    @seat_blocks = seat_blocks(dimensions)
  end

  def get_seating_arrangement(count)
    @count = count
    @aisle_pointer, @window_pointer, @middle_pointer = seat_type_pointers

    fillable_seats, remaining_seats, remaining_people = fill_stats(count)
    fill_seating(fillable_seats) unless @seat_blocks.empty?

    {
      seating: @seat_blocks,
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

  def fill_seating(_count)
    (0..(@max_row - 1)).each do |row_idx|
      (0..(@seat_blocks.size - 1)).each do |block_idx|
        fill_row_across_blocks(row_idx, block_idx) if row_idx < @seat_blocks[block_idx].size
      end
    end
  end

  def fill_row_across_blocks(row_idx, block_idx)
    (0..(@seat_blocks[block_idx][0].size - 1)).each do |column_idx|
      case seat_type(block_idx, column_idx)
      when 'aisle'
        fill_aisle_seat(row_idx, block_idx, column_idx) if @aisle_pointer <= @count
      when 'window'
        fill_window_seat(row_idx, block_idx, column_idx) if @window_pointer <= @count
      when 'middle'
        fill_middle_seat(row_idx, block_idx, column_idx) if @middle_pointer <= @count
      end
    end
  end

  def fill_aisle_seat(row_idx, block_idx, column_idx)
    @seat_blocks[block_idx][row_idx][column_idx] = @aisle_pointer
    @aisle_pointer += 1
  end

  def fill_window_seat(row_idx, block_idx, column_idx)
    @seat_blocks[block_idx][row_idx][column_idx] = @window_pointer
    @window_pointer += 1
  end

  def fill_middle_seat(row_idx, block_idx, column_idx)
    @seat_blocks[block_idx][row_idx][column_idx] = @middle_pointer
    @middle_pointer += 1
  end

  def seat_type(block_idx, column_idx)
    if column_idx.positive? && column_idx < @seat_blocks[block_idx][0].size - 1
      'middle'
    elsif block_idx.zero? && column_idx.zero?
      'window'
    elsif block_idx == @seat_blocks.size - 1 && column_idx == @seat_blocks[block_idx][0].size - 1
      'window'
    else
      'aisle'
    end
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
