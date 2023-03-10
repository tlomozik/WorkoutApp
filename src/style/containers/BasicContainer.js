import styled from 'styled-components/native';
import * as palette from '../variables';

const BasicContainer = styled.View`
  width: 100%;
  height: 50px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${palette.containersColor};
  border-radius: 5px;
  border-width: 1px;
`;

export default BasicContainer;
