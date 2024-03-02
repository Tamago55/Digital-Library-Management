resource "aws_lambda_function" "bookSearch" {
  function_name    = "bookSearch"
  filename         = "lambda_function_booksearch.zip"  // Assuming the source code is zipped in this file
  source_code_hash = filebase64sha256("lambda_function_booksearch.zip") // Update with your file name
  handler          = "index.handler" // Entry point in your source code
  runtime          = "nodejs14.x"
  role             = aws_iam_role.BookLambdaRole.arn
  package_type     = "Zip"
}

resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.bookSearch.function_name
  principal     = "apigateway.amazonaws.com"

  // The /*/* portion grants access from any method on any resource
  // within the specified API Gateway.
  source_arn = "${aws_api_gateway_rest_api.book_api.execution_arn}/*/*"
}