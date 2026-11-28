terraform {
  required_version = ">= 1.6.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

variable "region" {
  type    = string
  default = "ap-south-1"
}

provider "aws" {
  region = var.region
}

resource "aws_ecr_repository" "api" {
  name = "sapling-api"

  image_scanning_configuration {
    scan_on_push = true
  }

  image_tag_mutability = "IMMUTABLE"
}

resource "aws_ecr_repository" "web" {
  name = "sapling-web"

  image_scanning_configuration {
    scan_on_push = true
  }

  image_tag_mutability = "IMMUTABLE"
}

output "api_repository" {
  value = aws_ecr_repository.api.repository_url
}

output "web_repository" {
  value = aws_ecr_repository.web.repository_url
}
