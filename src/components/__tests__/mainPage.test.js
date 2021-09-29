import { render, waitFor } from "@testing-library/react";
import MainPage from "../main-page/MainPage";

it("decrements count delayed", async () => {
  const { getByText } = render(<MainPage/>);
  const countSpan = await waitFor(() => getByText("Hello, world!"));
  expect(countSpan).toBeInTheDocument;
});
