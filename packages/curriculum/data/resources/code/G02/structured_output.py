from pydantic import BaseModel,ConfigDict,Field,ValidationError
class Invoice(BaseModel):
    model_config=ConfigDict(extra='forbid',strict=True)
    currency: str=Field(pattern=r'^[A-Z]{3}$')
    total_minor_units: int=Field(ge=0)
assert Invoice.model_validate_json('{"currency":"INR","total_minor_units":1200}').total_minor_units==1200
try:
    Invoice.model_validate({'currency':'INR','total_minor_units':-1})
except ValidationError: print('invalid amount rejected')
else: raise AssertionError('invalid amount accepted')
