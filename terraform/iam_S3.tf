resource "aws_iam_policy" "s3_policy" {
  name        = "S3AccessPolicy"
  description = "Policy for accessing S3 resources"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:*",
        "s3-object-lambda:*"
      ],
      "Resource": [
        "arn:aws:s3:::kumostore",
        "arn:aws:s3:::kumostore/*"
      ]
    }
  ]
}
EOF
}


resource "aws_iam_user_policy_attachment" "s3_policy_attachment" {
    user       = "Hiorya_user" 
    policy_arn = aws_iam_policy.s3_policy.arn
  }
  