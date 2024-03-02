resource "aws_iam_role" "BookLambdaRole" {
  name               = "BookLambdaRole"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

data "aws_iam_policy_document" "book_lambda_policy" {
  statement {
    actions = [
      "logs:CreateLogStream",
      "logs:CreateLogGroup",
      "logs:PutLogEvents",
      //"dynamodb:Scan",
      "dynamodb:*",
    ]
    resources = [
      "arn:aws:logs:*:*:*",
      "arn:aws:dynamodb:*:*:table/KumoTable",
    ]
  }
}

resource "aws_iam_policy" "book_lambda_policy" {
  name        = "BookLambdaPolicy"
  description = "Policy for bookGet lambda function"
  policy      = data.aws_iam_policy_document.book_lambda_policy.json
}

resource "aws_iam_role_policy_attachment" "book_lambda_policy_attach" {
  role       = aws_iam_role.BookLambdaRole.name
  policy_arn = aws_iam_policy.book_lambda_policy.arn
}

# resource "aws_lambda_permission" "apigw-bookGet" {
#   action        = "lambda:InvokeFunction"
#   function_name = aws_lambda_function.bookGet.function_name
#   principal     = "apigateway.amazonaws.com"
#   source_arn    = "${aws_api_gateway_rest_api.book_api.execution_arn}/*/GET/booklist"
# }

