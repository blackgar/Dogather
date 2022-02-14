import styled from "styled-components";
import { IGroup } from "../MyPage";

function LikeGroup(group: IGroup) {
  return (
    <Container>
      <LeftSide>
        <ImgDiv>
          <ImgRadius>
            <Img src="https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e125b578-4173-401a-ab13-f066979c8848/air-force-1-older-shoes-11jxCZ.png" />
          </ImgRadius>
        </ImgDiv>
        <ProductDiv>
          <ProductTitle>{group.product}</ProductTitle>
          <ProductPeople>
            {group.count} / {group.maxPeople}
          </ProductPeople>
          <ProductDeadline>{group.deadline}</ProductDeadline>
        </ProductDiv>
      </LeftSide>
      <RightSide>
        <StatusDiv>
          {group.status === "마감" ? (
            <StatusOff>{group.status}</StatusOff>
          ) : (
            <StatusOn>{group.status}</StatusOn>
          )}
        </StatusDiv>
      </RightSide>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  /* align-items: center; */
  padding: 12px;
  border-bottom: 1px solid #ebebeb;
`;

const LeftSide = styled.div`
  display: flex;
`;

const ImgDiv = styled.div`
  position: relative;
  /* -webkit-box-flex: 0; */
  flex: none;
  width: 80px;
  height: 80px;
`;

const ImgRadius = styled.div`
  background-color: rgb(242, 242, 242);
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  padding-top: 100%;
`;

const Img = styled.img`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  height: auto;
  transform: translate(-50%, -50%);
`;

const ProductDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  margin-left: 16px;
`;

const ProductTitle = styled.p`
  font-size: 14px;
  line-height: 17px;
`;

const ProductPeople = styled.p`
  font-size: 14px;
  line-height: 19px;
  letter-spacing: -0.5px;
  margin-top: 4px;
`;

const ProductDeadline = styled.p`
  color: rgba(34, 34, 34, 0.5);
  font-size: 14px;
  font-weight: 700;
  line-height: 19px;
  letter-spacing: -0.5px;
  margin-top: 4px;
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
  text-align: right;
  margin-left: auto;
`;

const StatusDiv = styled.div`
  margin-left: 10px;
  width: 134px;
`;

const StatusOn = styled.div`
  color: #05c46b;
  font-size: 14px;
  letter-spacing: -0.21px;
`;

const StatusOff = styled.div`
  color: #c23616;
  font-size: 14px;
  letter-spacing: -0.21px;
`;

export default LikeGroup;