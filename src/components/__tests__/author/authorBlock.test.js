import { render, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AuthorBlock from "../../author/AuthorBlock";

it("decrements count delayed", async () => {
    let name = "test name";
  const { getByText } = render(<BrowserRouter>
    <AuthorBlock name={name} id={1}/>
  </BrowserRouter>);
  const countSpan = await waitFor(() => getByText(name));
  
  expect(countSpan).toBeInTheDocument;
});
