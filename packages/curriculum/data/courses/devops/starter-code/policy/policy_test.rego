package learning
import rego.v1
test_privileged_denied if {
    count(deny with input as {"spec":{"containers":[{"name":"x","securityContext":{"privileged":true}}]}}) == 1
}
test_safe if {
    count(deny with input as {"spec":{"containers":[{"name":"x"}]}}) == 0
}
