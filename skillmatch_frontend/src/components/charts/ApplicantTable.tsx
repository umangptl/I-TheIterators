import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { Paper } from "@mui/material";
import { useApplicationsContext } from "../../hooks/ApplicationsContext";
import TablePagination from "@mui/material/TablePagination";
import TableFooter from "@mui/material/TableFooter";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import CurrentStageChip from "../common/CurrentStageChip";
import CurrentStageChipDashboard from "../common/CurrentStageChipDashboard";
import { Link } from "react-router-dom";

type jobId = {
  jobId: string;
  statusSelected: string;
};

const ApplicantTable = (props: jobId) => {
  function createData(name: string, status: string, linkTo: string) {
    return { name, status, linkTo };
  }

  const statusToId = {
    REJECTED: 0,
    PENDING: 1,
    INTERVIEWING: 2,
    SELECTED: 3,
    SHORTLISTED: 4,
    WITHDRAWN: 5,
  };

  let rows: any[] = [];
  const { applications } = useApplicationsContext();

  interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
      event: React.MouseEvent<HTMLButtonElement>,
      newPage: number
    ) => void;
  }

  function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      onPageChange(event, 0);
    };

    const handleBackButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (props.jobId != "-1") {
    const filteredApps = applications.filter(
      (app) => app.jobId === props.jobId
    );
    console.log(filteredApps);
    filteredApps.map((application, key) => {
      if (
        application.status != "REJECTED" &&
        application.status != "WITHDRAWN"
      ) {
        if (props.statusSelected != "-1") {
          if (props.statusSelected == application.status) {
            rows.push(
              createData(
                application.applicant.firstName +
                  " " +
                  application.applicant.lastName,
                application.status,
                application.applicationId
              )
            );
          }
        } else {
          rows.push(
            createData(
              application.applicant.firstName +
                " " +
                application.applicant.lastName,
              application.status,
              application.applicationId
            )
          );
        }
      }
    });
  } else {
    applications.map((application, key) => {
      if (
        application.status != "REJECTED" &&
        application.status != "WITHDRAWN"
      ) {
        if (props.statusSelected != "-1") {
          if (props.statusSelected == application.status) {
            rows.push(
              createData(
                application.applicant.firstName +
                  " " +
                  application.applicant.lastName,
                application.status,
                application.applicationId
              )
            );
          }
        } else {
          rows.push(
            createData(
              application.applicant.firstName +
                " " +
                application.applicant.lastName,
              application.status,
              application.applicationId
            )
          );
        }
      }
    });
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell style={{ width: 200 }} align="right">
                <CurrentStageChipDashboard activeLabel={row.status} />
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                <Link
                  to={"/applicant/" + row.linkTo}
                  style={{ textDecoration: "none" }}
                >
                  Info
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default ApplicantTable;
