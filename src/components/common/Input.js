import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const InputWrapper = styled.div``;
const StyledInput = styled.button`
  width: 100px;
  font-size: 16px;
`;

const Input = ({ type, name, label, onChange, placeholder, value }) => {
  console.log(name, value, "from input");
  return (
    <InputWrapper>
      <label htmlFor={name}>{label}</label>
      <StyledInput>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </StyledInput>
    </InputWrapper>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string
};

export default Input;
