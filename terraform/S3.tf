resource "aws_s3_bucket" "bucket" {
  bucket = "kumostore"

  tags = {
    Name        = "My bucket"
    Environment = "Dev"
  }
}

# resource "aws_s3_bucket_policy" "bucket_policy" {
#   bucket = aws_s3_bucket.bucket.id

#   policy = <<POLICY
# {
#   "Version":"2012-10-17",
#   "Statement":[
#     {
#       "Sid":"PublicReadGetObject",
#       "Effect":"Allow",
#       "Principal": "*",
#       "Action":["s3:GetObject"],
#       "Resource":["arn:aws:s3:::kumostore/*"]
#     }
#   ]
# }
# POLICY
# }

resource "aws_s3_object" "indexhtml" {
  bucket = "kumostore"
  key    = "webapp/index.html"
  source = "../webapp/index.html"
}

resource "aws_s3_bucket_object" "indexjs" {
  bucket = "kumostore"
  key    = "webapp/index.js"
  source = "../webapp/index.js"  
}

resource "aws_s3_bucket_object" "stylescss" {
  bucket = "kumostore"
  key    = "webapp/styles.css"
  source = "../webapp/styles.css"  
  
}

resource "aws_s3_bucket_object" "addbookhtml" {
  bucket = "kumostore"
  key    = "webapp/addbook.html"
  source = "../webapp/addbook.html" 
  
}

resource "aws_s3_bucket_object" "addbookjs" {
  bucket = "kumostore"
  key    = "webapp/addbook.js"
  source = "../webapp/addbook.js"  
  
}

resource "aws_s3_bucket_object" "editbookhtml" {
  bucket = "kumostore"
  key    = "webapp/editbook.html"
  source = "../webapp/editbook.html" 
  
}

resource "aws_s3_bucket_object" "editbookjs" {
  bucket = "kumostore"
  key    = "webapp/editbook.js"
  source = "../webapp/editbook.js"  
  
}

# resource "aws_s3_bucket_object" "loginhtml" {
#   bucket = "kumostore"
#   key    = "webapp/login.html"
#   source = "../webapp/login.html" 
  
# }

# resource "aws_s3_bucket_object" "loginjs" {
#   bucket = "kumostore"
#   key    = "webapp/login.js"
#   source = "../webapp/login.js"  
  
# }

# resource "aws_s3_bucket_object" "logoutjs" {
#   bucket = "kumostore"
#   key    = "webapp/logout.js"
#   source = "../webapp/logout.js"  
  
# }

# resource "aws_s3_bucket_object" "signuphtml" {
#   bucket = "kumostore"
#   key    = "webapp/signup.html"
#   source = "../webapp/signup.html" 
  
# }

# resource "aws_s3_bucket_object" "signupjs" {
#   bucket = "kumostore"
#   key    = "webapp/signup.js"
#   source = "../webapp/signup.js"  
  
# }

# resource "aws_s3_bucket_object" "verifyhtml" {
#   bucket = "kumostore"
#   key    = "webapp/verify.html"
#   source = "../webapp/verify.html" 
  
# }

# resource "aws_s3_bucket_object" "verifyjs" {
#   bucket = "kumostore"
#   key    = "webapp/verify.js"
#   source = "../webapp/verify.js"  

# }

///////picture////////////
resource "aws_s3_bucket_object" "image1" {
  bucket = "kumostore"
  key    = "webapp/images/jdd1vdvn76o.png"
  source = "../webapp/images/jdd1vdvn76o.png"  
}

resource "aws_s3_bucket_object" "image2" {
  bucket = "kumostore"
  key    = "webapp/images/uebrdus7ij8.png"
  source = "../webapp/images/uebrdus7ij8.png"  
}

resource "aws_s3_bucket_object" "image3" {
  bucket = "kumostore"
  key    = "webapp/images/5q4j1d0qah.png"
  source = "../webapp/images/5q4j1d0qah.png"  
}

resource "aws_s3_bucket_object" "imagenodata" {
  bucket = "kumostore"
  key    = "webapp/images/no_data.png"
  source = "../webapp/images/no_data.png"  
}

///////document////////////
resource "aws_s3_bucket_object" "book1" {
  bucket = "kumostore"
  key    = "webapp/books/uebrdus7ij8.pdf"
  source = "../webapp/books/uebrdus7ij8.pdf"  
}

resource "aws_s3_bucket_object" "book2" {
  bucket = "kumostore"
  key    = "webapp/books/jdd1vdvn76o.pdf"
  source = "../webapp/books/jdd1vdvn76o.pdf"  
}

resource "aws_s3_bucket_object" "book3" {
  bucket = "kumostore"
  key    = "webapp/books/5q4j1d0qah.pdf"
  source = "../webapp/books/5q4j1d0qah.pdf"  
}