terraform {
  required_version = ">= 1.4, < 2.0"
}
variable "environment" {
  type = string
  default = "learning"
  validation {
    condition = contains(["learning", "staging"], var.environment)
    error_message = "Use a lab environment."
  }
}
resource "terraform_data" "example" {
  input = var.environment
}
output "environment" {
  value = terraform_data.example.output
}
