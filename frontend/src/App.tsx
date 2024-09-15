import {Box, useColorModeValue} from "@chakra-ui/react";
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import CreatePage from "./pages/CreatePage.tsx";
import Navbar from "./components/Navbar.tsx";

function App() {
  return (
    <>
      <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
          <Navbar />
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/create" element={<CreatePage />} />
          </Routes>
      </Box>
    </>
  )
}

export default App
