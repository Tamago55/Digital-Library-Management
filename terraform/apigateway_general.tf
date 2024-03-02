resource "aws_api_gateway_rest_api" "book_api" {
  name        = "book-list"
  description = "book list"
  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

resource "aws_api_gateway_deployment" "deployment" {
  depends_on  = [
    aws_api_gateway_integration.search_integration,
    aws_api_gateway_integration.add_integration,
    aws_api_gateway_integration.edit_integration,
    aws_api_gateway_integration.delete_integration,
  ]
  rest_api_id = aws_api_gateway_rest_api.book_api.id
  stage_name  = "bookstage"
}