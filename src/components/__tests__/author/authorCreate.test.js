import { render, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AuthorCreatePage from "../../author/AuthorCreatePage";

it("decrements count delayed", async () => {
  const { getByText } = render(<BrowserRouter>
  <AuthorCreatePage/>
  </BrowserRouter>);
  const countSpan = await waitFor(() => getByText("create"));
  expect(countSpan).toBeInTheDocument;
});
