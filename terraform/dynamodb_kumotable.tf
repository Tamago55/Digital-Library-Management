resource "aws_dynamodb_table" "KumoTable" {
  name         = "KumoTable"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "Book_id"

  attribute {
    name = "Book_id"
    type = "S"
  }

  lifecycle {
    ignore_changes = [
      read_capacity,
      write_capacity,
    ]
  }

  tags = {
    Name = "KumoTable"
  }
}
