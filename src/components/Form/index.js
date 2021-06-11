import React from "react";
import { FormGroup, Input, Label } from "reactstrap";
import '../../styles/form.scss';
function Form() {
  return (
    <div className="form">
      <FormGroup>
        <Label for="exampleEmail">Products</Label>
        <Input
          type="text"
          name="text"          
          placeholder="with a placeholder"
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleEmail">Date</Label>
        <Input
          type="text"
          name="text"
          placeholder="with a placeholder"
        />
      </FormGroup>
    </div>
  );
}

export default Form;
