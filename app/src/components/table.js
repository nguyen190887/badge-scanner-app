import styled from '@emotion/styled';

export const StyledTable = styled.table`
  overflow: hidden;

  tr {
    width: 100%;
  }

  // a {
  //   position: absolute;
  //   width: 100%;
  //   height: 10px;
  //   cursor: pointer;
  //   ${document && document.querySelector('.table').getBoundingClientRect()};
  // }
`;

export const Header = styled.tr`
  background-color: #339933;
  color: white;
`;

export const Row = styled.tr`
  background-color: #fffdf7;

  :hover {
    background-color: #fff5bf;
  }
`;
