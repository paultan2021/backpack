import React from "react";
export default (({
  styles = {},
  ...props
}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{
  width: "1.5rem",
  height: "1.5rem"
}} {...props}><path fillRule="evenodd" d="M5.902 21c-2.228 0-3.623-2.645-2.512-4.765l6.098-11.64c1.114-2.127 3.91-2.127 5.024 0l6.098 11.64c1.11 2.12-.284 4.765-2.512 4.765H5.902zM12 15a1 1 0 0 1-1-1V9a1 1 0 1 1 2 0v5a1 1 0 0 1-1 1zm0 3a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" clipRule="evenodd" /></svg>);