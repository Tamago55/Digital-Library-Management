resource "aws_api_gateway_resource" "booklist_search" {
  rest_api_id = aws_api_gateway_rest_api.book_api.id
  parent_id   = aws_api_gateway_rest_api.book_api.root_resource_id
  path_part   = "booklist_search"
}

resource "aws_api_gateway_method" "search_method" {
  rest_api_id   = aws_api_gateway_rest_api.book_api.id
  resource_id   = aws_api_gateway_resource.booklist_search.id
  http_method   = "POST"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "search_integration" {
  rest_api_id             = aws_api_gateway_rest_api.book_api.id
  resource_id             = aws_api_gateway_resource.booklist_search.id
  http_method             = aws_api_gateway_method.search_method.http_method
  integration_http_method = "POST"
  type                    = "AWS"
  uri                     = aws_lambda_function.bookSearch.invoke_arn

  request_templates = {
    "application/json" = <<EOF
#set($inputRoot = $input.path('$'))
{
    "keyword": "$inputRoot.keyword"
}
EOF
  }
}


// Define the method response model
resource "aws_api_gateway_method_response" "search_method_response_200" {
  rest_api_id = aws_api_gateway_rest_api.book_api.id
  resource_id = aws_api_gateway_resource.booklist_search.id
  http_method = aws_api_gateway_method.search_method.http_method
  status_code = "200"
  response_models = {
    "application/json" = "Empty" // Assuming no response models for this example
  }
}

// Define integration response
resource "aws_api_gateway_integration_response" "search_integration_response_200" {
   rest_api_id = aws_api_gateway_rest_api.book_api.id
   resource_id = aws_api_gateway_resource.booklist_search.id
   http_method = aws_api_gateway_method.search_method.http_method
   status_code = "200"//aws_api_gateway_method_response.search_method_response_200.status_code

   response_templates = {
     "application/json" = <<EOF
 #set($inputRoot = $input.path('$'))
 $inputRoot.body
 EOF
   }
 }