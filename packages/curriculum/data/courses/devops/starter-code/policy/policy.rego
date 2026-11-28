package learning
import rego.v1
deny contains msg if {
    some c in input.spec.containers
    c.securityContext.privileged == true
    msg := sprintf("privileged container: %s", [c.name])
}
