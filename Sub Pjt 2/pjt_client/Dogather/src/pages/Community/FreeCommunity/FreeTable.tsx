import * as React from "react";
import styled from "styled-components";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";

function createData(
  postno: number,
  title: string,
  writer: string,
  view: number,
  created: string
) {
  return { postno, title, writer, view, created };
}

const rows = [
  createData(1, "Frozen yoghurt", "Asd", 159, "asd"),
  createData(2, "Ice cream sandwich", "Asd", 237, "ASd"),
  createData(3, "Eclair", "Asd", 262, "fsdf"),
  createData(4, "Cupcake", "Asd", 305, "Sdgd"),
  createData(5, "Gingerbread", "Asd", 356, "Dfgdf"),
  createData(6, "Gingerbread", "Asd", 356, "Dfgdf"),
  createData(7, "Gingerbread", "Asd", 356, "Dfgdf"),
  createData(8, "Gingerbread", "Asd", 356, "Dfgdf"),
  createData(9, "Gingerbread", "Asd", 356, "Dfgdf"),
  createData(10, "Gingerbread", "Asd", 356, "Dfgdf"),
];

// neutral 색깔
const theme = createTheme({
  palette: {
    neutral: {
      main: "#000000",
      contrastText: "#fff",
    },
  },
});

declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"];
  }

  interface PaletteOptions {
    neutral?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}
// neutral 색깔

function FreeTable() {
  return (
    <Container>
      <Top>
        <H1>자유게시판</H1>
        <CustomTabs>
          <Tabs>
            <Tab label="최신글" />
            <Tab label="조회수" />
            <Tab label="랭킹순" />
          </Tabs>
        </CustomTabs>
        <div></div>
        <Hr />
      </Top>
      <Mid>
        <CustomStack>
          <Stack spacing={5} direction="column">
            <ThemeProvider theme={theme}>
              <Button variant="outlined" color="neutral">
                <a href="announcement">공지사항게시판</a>
              </Button>
              <Button variant="outlined" color="neutral">
                <a href="A">중고판매게시판</a>
              </Button>
              <Button variant="outlined" color="neutral">
                <a href="infoshare">정보공유게시판</a>
              </Button>
              <Button variant="contained" color="neutral">
                <a href="free">자유게시판</a>
              </Button>
              <Button variant="outlined" color="neutral">
                <a href="review">후기게시판</a>
              </Button>
              <Btn2>사이즈 조정용</Btn2>
            </ThemeProvider>
          </Stack>
        </CustomStack>
        <CustomTable>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell align="left">제목</TableCell>
                  <TableCell align="right">작성자</TableCell>
                  <TableCell align="right">조회수</TableCell>
                  <TableCell align="right">생성시간</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.postno}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.postno}
                    </TableCell>
                    <TableCell align="left">
                      {row.title}
                      <Imo>
                        <img src={process.env.PUBLIC_URL + "/img/like.png"} />
                      </Imo>
                      <H3>3</H3>
                      <Imo>
                        <img
                          src={process.env.PUBLIC_URL + "/img/comment.png"}
                        />
                      </Imo>
                      <H3>1</H3>
                    </TableCell>
                    <TableCell align="right">{row.writer}</TableCell>
                    <TableCell align="right">
                      <Imo>
                        <img src={process.env.PUBLIC_URL + "/img/view.png"} />
                      </Imo>
                      {row.view}
                    </TableCell>
                    <TableCell align="right">{row.created}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CustomTable>
      </Mid>
      <Bottom>
        <Input type="text" />
        <Btn>
          <img src={process.env.PUBLIC_URL + "/img/search.png"} />
        </Btn>
        <CustomWrite>
          <ThemeProvider theme={theme}>
            <Button variant="outlined" color="neutral">
              글쓰기
            </Button>
          </ThemeProvider>
        </CustomWrite>
        <CustomPage>
          <Pagination count={10} variant="outlined" shape="rounded" />
        </CustomPage>
      </Bottom>
    </Container>
  );
}

const Container = styled.div``;

const Btn2 = styled.button`
  width: 8vw;
  color: white;
  background-color: white;
  border: 0;
`;

const Mid = styled.span`
  display: flex;
`;

const H1 = styled.h1`
  display: inline-block;
  font-size: 50px;
  margin-left: 14vw;
`;

const CustomTabs = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 7vw;
`;

const CustomStack = styled.div`
  display: inline-block;
  margin-top: 8vw;
  margin-left: 4vw;
  width: 9vw;
`;

const CustomTable = styled.div`
  dispaly: inline-block;
  width: 75vw;
  margin-left: 4vw;
`;

const Hr = styled.hr`
  display: flex;
  width: 79vw;
  height: 3px;
  border: none;
  background-color: black;
  margin-left: 14vw;
  margin-bottom: 50px;
`;

const Top = styled.div`
  margin-top: 50px;
`;

const Input = styled.input`
  width: 20vw;
  height: 4vh;
  border-radius: 7px;
  margin-left: 43vw;
`;

const CustomWrite = styled.div`
  display: inline-flex;
  margin-left: 22vw;
`;

const CustomPage = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 25px;
  margin-left: 6.3vw;
`;

const Bottom = styled.div`
  margin-top: 2.5vw;
  margin-bottom: 2.5vw;
`;

const H3 = styled.h3`
  display: inline;
  font-size: 15px;
`;

const Imo = styled.span`
  margin-left: 4px;
  margin-right: 4px;
`;

const Btn = styled.button`
  border: 0;
  outline: 0;
  background-color: white;
  cursor: pointer;
`;

export default FreeTable;
