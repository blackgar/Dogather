import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { isLoginAtom, userIdAtom, userNoAtom } from "../../atoms/Login";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

import CreateOption from "./CreateMoimComponents/Option/CreateOption";
import { OptionsAtom } from "../../atoms/Options";
import Option from "./CreateMoimComponents/Option/Option";
import CreateFAQ from "./CreateMoimComponents/FAQ/CreateFAQ";
import { FAQsAtom } from "../../atoms/FAQs";
import FAQ from "./CreateMoimComponents/FAQ/FAQ";
import { useState } from "react";
import { ProductCategories } from "../../atoms/ProductCategories";

// useForm에 담길 데이터 타입
export interface IMoimForm {
  groupLeader: number; // 모임 대표
  categoryNo: number; // 카테고리 pk
  deadline: string; // *공구 마감 날짜
  maxPeople: number; // 인원 수
  status: string; // *공구 진행 상태
  product: string; // 모임 제목 (상품명)
  detail: string; // 모임 상세설명 (상품 상세설명)
  link: string; // 제품 url
  originPrice: number; // 출시 가격
  price: number; // 공구 가격
}

interface IAreaProps {
  isDraggingOver: boolean; // 드래그 해서 들어오고 있음
  isDraggingFromThis: boolean;
}

function CreateMoim() {
  const navigate = useNavigate(); // 페이지 이동

  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);
  const [userNo, setUserNo] = useRecoilState(userNoAtom);
  const [userId, setUserId] = useRecoilState(userIdAtom);
  const [options, setOptions] = useRecoilState(OptionsAtom);
  const [FAQs, setFAQs] = useRecoilState(FAQsAtom);

  // useForm으로 form 내용 한 번에 받음
  const {
    register, // 지정된 form 내부 입력값들을 받아와서 저장
    handleSubmit, // validation 담당
    formState: { errors }, // formState: form 상태 정보, errors: 입력값들의 에러 정보
    setError, // 특정한 에러 발생 생성
    watch, // 입력값들의 변화 관찰
    getValues, // 입력값들을 읽음
    setValue, // 입력값들을 설정
  } = useForm<IMoimForm>({ mode: "onBlur" }); // onBlur: 입력 후 input 벗어났을 때 유효성 검사

  // 현재 날짜와 시간 (모임 마감 일시 최소값)
  let nowDate = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, -5);

  // 대표 이미지 업로드
  const [file, setFile] = useState<FileList | undefined>(); // 대표 이미지 저장 (useForm과 따로 관리)
  const [fileAttachment, setFileAttachment] = useState(); // 미리보기
  // 파일 업로드 시 실행
  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;

    if (files != null) {
      setFile(files);
      const mainFile = files[0];
      const reader = new FileReader(); // 미리보기
      reader.onloadend = (finishedEvent: any) => {
        const {
          currentTarget: { result },
        } = finishedEvent;
        setFileAttachment(result);
      };
      reader.readAsDataURL(mainFile); // 파일 읽음
    }
  };

  // 상세 이미지 업로드
  const [fileList, setFileList] = useState<FileList | undefined>(); // 상세 이미지 저장 (useForm과 따로 관리)
  // 파일 업로드 시 실행
  const onChangeFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;

    if (files != null) {
      setFileList(files);
    }
  };

  // form 제출 시 실행
  const onValid = (data: IMoimForm) => {
    const JWT = localStorage.getItem("login_token"); // 토큰 가져오기 (Interceptor 정보)

    // 마감 날짜 시간 형식 변환 (DB에 맞는 양식)
    const newDeadline =
      data.deadline.replace("T", " ").substring(0, 19) + ":00";

    const newData = {
      group: {
        ...data,
        deadline: newDeadline,
        groupLeader: userNo,
        status: "모집중",
      },
      options: options,
      requestfaq: FAQs,
    };

    const formData = new FormData(); // 이미지 보내기 위해 FormData() 사용

    formData.append(
      // 파일 외 데이터들 추가
      "groupRegisterDto",
      new Blob([JSON.stringify(newData)], { type: "application/json" }) // 데이터 전송 시 FormData는 body에 따로 처리없이 보내기 때문에 파일 외 데이터들은 append 할 때 Blob 처리 해줌
    );

    if (fileList != null) {
      // 상세 이미지 추가
      Array.from(fileList).forEach((f) => formData.append("file", f));
    }

    if (file != null) {
      // 대표 이미지 추가
      formData.append("mainImage", file[0]);
    }

    // 데이터 전송
    fetch("http://i6e104.p.ssafy.io/api/group/register", {
      method: "POST",
      headers: {
        // Interceptor
        jwt: `${JWT}`,
        userId: userId,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          if (result.msg === "relogin") {
            // 토큰 만료 시
            localStorage.clear(); // 로컬 스토리지 비우기
            setIsLogin(false); // 로그인 여부 초기화
            setUserNo(""); // 저장된 user pk 초기화
            setUserId(""); // 저장된 user id 초기화
            alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
            setTimeout(() => {
              // 1ms (0.001초) 후 navigate 실행 (미세한 차이로 isLogin이 false 되는 것 보다 navigate가 빨라 isLogin이 true라고 판단하여 로그인 페이지에서 메인 페이지로 튕김)
              navigate("/login"); // 로그인 페이지로 이동
            }, 1);
          } else {
            // 토큰 만료 아닐 시
            const ObjectToString = JSON.stringify(result); // 반환값이 object이므로 string으로 변환 (navigate시 url 깨지는 현상 해결)
            navigate(`/moim/${ObjectToString}`); // 모임 상세 페이지로 이동
          }
        }
      });
  };

  // 옵션 drop 했을 때 불려지는 함수
  const onDragEndOption = (info: DropResult) => {
    const { destination, draggableId, source } = info;

    if (!destination) return;

    setOptions((options) => {
      const optionsCopy = [...options];
      const optionToMove = optionsCopy[source.index];
      optionsCopy.splice(source.index, 1);
      optionsCopy.splice(destination?.index, 0, optionToMove);
      return optionsCopy;
    });
  };

  // FAQ drop 했을 때 불려지는 함수
  const onDragEndFAQ = (info: DropResult) => {
    const { destination, draggableId, source } = info;

    if (!destination) return;

    setFAQs((faqs) => {
      const faqsCopy = [...faqs];
      const faqToMove = faqsCopy[source.index];
      faqsCopy.splice(source.index, 1);
      faqsCopy.splice(destination?.index, 0, faqToMove);
      return faqsCopy;
    });
  };

  return (
    <Container>
      <FormContainer>
        <Block>
          <FormTitle>
            <span>모임 생성</span>
          </FormTitle>
        </Block>
        <form id="total" onSubmit={handleSubmit(onValid)}>
          <Block>
            <InputTitle>
              <span>카테고리</span>
              <Required>*</Required>
            </InputTitle>
            <InputDiv>
              <Select
                {...register("categoryNo", {
                  required: "필수 정보입니다.",
                })}
              >
                <option value="">카테고리 선택</option>
                <option value={ProductCategories.남성패션}>남성패션</option>
                <option value={ProductCategories.여성패션}>여성패션</option>
                <option value={ProductCategories["뷰티/미용"]}>
                  뷰티/미용
                </option>
                <option value={ProductCategories.식품}>식품</option>
                <option value={ProductCategories["건강/의료용품"]}>
                  건강/의료용품
                </option>
                <option value={ProductCategories.생활가전}>생활가전</option>
                <option value={ProductCategories.디지털기기}>디지털기기</option>
                <option value={ProductCategories["가구/인테리어"]}>
                  가구/인테리어
                </option>
                <option value={ProductCategories.생활용품}>생활용품</option>
                <option value={ProductCategories["도서/티켓/E쿠폰"]}>
                  도서/티켓/E쿠폰
                </option>
                <option value={ProductCategories["출산/유아동"]}>
                  출산/유아동
                </option>
                <option value={ProductCategories.반려동물용품}>
                  반려동물용품
                </option>
                <option value={ProductCategories["스포츠/레저"]}>
                  스포츠/레저
                </option>
                <option value={ProductCategories["자동차/공구"]}>
                  자동차 공구
                </option>
                <option value={ProductCategories.악기}>악기</option>
                <option value={ProductCategories["게임/놀이"]}>
                  게임/놀이
                </option>
              </Select>
              <ErrorMessage>{errors?.categoryNo?.message}</ErrorMessage>
            </InputDiv>
            <ExpDiv>
              <Exp>
                상품과 맞지 않는 카테고리를 등록할 경우 강제 이동되거나 중지 및
                금지 될 수 있습니다.
              </Exp>
            </ExpDiv>
          </Block>
          <Block>
            <InputTitle>
              <span>제목 (상품명)</span>
              <Required>*</Required>
            </InputTitle>
            <InputDiv>
              <Input
                {...register("product", {
                  required: "필수 정보입니다.",
                })}
                placeholder="최대 50자 입력"
                maxLength={50}
              />
              <ErrorMessage>{errors?.product?.message}</ErrorMessage>
            </InputDiv>
            <ExpDiv>
              <Exp>
                판매 상품과 직접 관련이 없는 다른 상품명, 스팸성 키워드 입력 시
                관리자에 의해 판매 금지될 수 있습니다.
                <br />
                유명 상품 유사문구를 무단으로 도용하여 ~스타일, ~st 등과 같이
                기재하는 경우 별도 고지 없이 제재될 수 있습니다.
                <br />
                상품명을 잘 맞게 입력하면 검색 노출에 도움이 될 수 있습니다.
              </Exp>
            </ExpDiv>
          </Block>
          <Block>
            <InputTitle>
              <span>가격</span>
              <Required>*</Required>
            </InputTitle>
            <InputDiv>
              <SubInputTopDiv>
                <SubTitle>
                  <span>출시 가격</span>
                  <Required>*</Required>
                </SubTitle>
                <div>
                  <MiniInput
                    {...register("originPrice", {
                      required: "필수 정보입니다.",
                    })}
                    type="number"
                    placeholder="숫자만 입력"
                  />
                  <ErrorMessage>{errors?.originPrice?.message}</ErrorMessage>
                </div>
              </SubInputTopDiv>
              <SubInputBottomDiv>
                <SubTitle>
                  <span>공구 가격</span>
                  <Required>*</Required>
                </SubTitle>
                <div>
                  <MiniInput
                    {...register("price", {
                      required: "필수 정보입니다.",
                    })}
                    type="number"
                    placeholder="숫자만 입력"
                  />
                  <ErrorMessage>{errors?.price?.message}</ErrorMessage>
                </div>
              </SubInputBottomDiv>
            </InputDiv>
            <ExpDiv>
              <Exp>
                출시 가격 : 해당 상품의 정가
                <br />
                공구 가격 : 공동 구매 시 구매 또는 판매할 수 있는 가격
              </Exp>
            </ExpDiv>
          </Block>
          <Block>
            <InputTitle>
              <span>모임 인원수</span>
              <Required>*</Required>
            </InputTitle>
            <InputDiv>
              <MiniInput
                {...register("maxPeople", {
                  required: "필수 정보입니다.",
                })}
                type="number"
                placeholder="숫자만 입력"
              />
              <ErrorMessage>{errors?.maxPeople?.message}</ErrorMessage>
            </InputDiv>
            <ExpDiv>
              <Exp>
                공동구매를 함께 진행할 최대 인원수를 입력합니다.
                <br />
                인원이 모두 확보되면 공동구매 과정이 진행됩니다.
              </Exp>
            </ExpDiv>
          </Block>
          <Block>
            <InputTitle>
              <span>모임 마감 일시</span>
              <Required>*</Required>
            </InputTitle>
            <InputDiv>
              <MiniInput
                {...register("deadline", {
                  required: "필수 정보입니다.",
                  validate: {
                    checkDate: (value) =>
                      nowDate < value
                        ? true
                        : "현재 시간 이후로 설정 가능합니다.",
                  },
                })}
                type="datetime-local"
              />
              <ErrorMessage>{errors?.deadline?.message}</ErrorMessage>
            </InputDiv>
            <ExpDiv>
              <Exp>
                공동구매 인원 모집의 마감 날짜를 입력해 주시기 바랍니다. (달력
                아이콘으로 쉽고 빠르게 입력 가능합니다.)
                <br />
                시작 날짜는 모임 생성 시간으로 자동 적용됩니다.
              </Exp>
            </ExpDiv>
          </Block>
          <Block>
            <InputTitle>
              <span>상세 설명</span>
              <Required>*</Required>
            </InputTitle>
            <InputDiv>
              <TextArea
                {...register("detail", {
                  required: "필수 정보입니다.",
                })}
              />
              <ErrorMessage>{errors?.detail?.message}</ErrorMessage>
            </InputDiv>
            <ExpDiv>
              <Exp>
                외부링크를 통한 개인정보(휴대폰 번호, 이메일 주소) 수집은
                금지되므로 등록시 노출이 제재될 수 있습니다.
                <br />
                상품명과 직접적 관련 없는 상세설명, 외부 링크 입력 시 관리자에
                의해 판매 금지 될 수 있습니다.
              </Exp>
            </ExpDiv>
          </Block>
          <Block>
            <InputTitle>
              <span>대표 이미지</span>
            </InputTitle>
            <ImgDiv>
              <ImgBox htmlFor="file">
                <ImgBoxInside>+</ImgBoxInside>
              </ImgBox>
              <Files
                type="file"
                id="file"
                accept="image/*"
                onChange={onChangeFile}
              />
              {fileAttachment && (
                <Img>
                  <img src={fileAttachment} width="150px" height="150px" />
                </Img>
              )}
            </ImgDiv>
            <ExpDiv>
              <Exp>모임 리스트에서 보일 대표 이미지를 설정해 주세요.</Exp>
            </ExpDiv>
          </Block>
          <Block>
            <InputTitle>
              <span>상품 상세 이미지 ({fileList ? fileList.length : 0})</span>
            </InputTitle>
            <ImgDiv>
              <ImgBox htmlFor="files">
                <ImgBoxInside>+</ImgBoxInside>
              </ImgBox>
              <Files
                type="file"
                id="files"
                multiple
                accept="image/*"
                onChange={onChangeFiles}
              />
              {fileList && (
                <Img>
                  {Array.from(fileList).map((file) => (
                    <ImgList key={file.name}>{file.name}</ImgList>
                  ))}
                </Img>
              )}
            </ImgDiv>
            <ExpDiv>
              <Exp>상품 상세 내용을 보여줄 다수의 사진을 첨부해 주세요.</Exp>
            </ExpDiv>
          </Block>
          <Block>
            <InputTitle>
              <span>링크</span>
              <Required>*</Required>
            </InputTitle>
            <InputDiv>
              <Input
                {...register("link", {
                  required: "필수 정보입니다.",
                })}
                placeholder="1개의 URL 입력"
                maxLength={4000}
              />
              <ErrorMessage>{errors?.link?.message}</ErrorMessage>
            </InputDiv>
            <ExpDiv>
              <Exp>
                해당 상품이나 업체의 정보를 확인할 수 있는 URL을 입력해주시기
                바랍니다.
                <br />
                최대 1개의 URL을 입력할 수 있으니 신중히 선택하시기 바랍니다.
                (추후 수정 가능)
              </Exp>
            </ExpDiv>
          </Block>
        </form>
        <Block>
          <InputTitle>
            <span>옵션</span>
          </InputTitle>
          <InputDiv>
            <CreateOption />
            <Table>
              <TableTitleDiv>
                <TableTitle>옵션 조합</TableTitle>
                <TableTitle>추가 가격</TableTitle>
                <TableTitle></TableTitle>
              </TableTitleDiv>
              <DragDropContext onDragEnd={onDragEndOption}>
                <Droppable droppableId="option">
                  {(magic, snapshot) => (
                    <Area
                      isDraggingOver={snapshot.isDraggingOver}
                      isDraggingFromThis={Boolean(
                        snapshot.draggingFromThisWith
                      )}
                      ref={magic.innerRef}
                      {...magic.droppableProps}
                    >
                      {options?.map((option, index) => (
                        <Option
                          key={option.id}
                          index={index}
                          id={option.id}
                          optionName={option.optionName}
                          optionPrice={option.optionPrice}
                        />
                      ))}
                      {magic.placeholder}
                    </Area>
                  )}
                </Droppable>
              </DragDropContext>
            </Table>
          </InputDiv>
          <ExpDiv>
            <Exp>
              ※ 드래그 앤 드롭으로 옵션 순서를 변경할 수 있습니다.
              <br />
              옵션 조합 : 각 옵션의 조합을 하나씩 입력해 주시기 바랍니다.
              <br />
              추가 가격 : 해당 옵션을 선택했을 때 추가 되는 가격을 숫자로만
              입력해 주시기 바랍니다.
            </Exp>
          </ExpDiv>
        </Block>
        <Block>
          <InputTitle>
            <span>FAQ</span>
          </InputTitle>
          <InputDiv>
            <CreateFAQ />
            <Table>
              <TableTitleDiv>
                <TableTitle>질문</TableTitle>
                <TableTitle>답변</TableTitle>
                <TableTitle></TableTitle>
              </TableTitleDiv>
              <DragDropContext onDragEnd={onDragEndFAQ}>
                <Droppable droppableId="faq">
                  {(magic, snapshot) => (
                    <Area
                      isDraggingOver={snapshot.isDraggingOver}
                      isDraggingFromThis={Boolean(
                        snapshot.draggingFromThisWith
                      )}
                      ref={magic.innerRef}
                      {...magic.droppableProps}
                    >
                      {FAQs?.map((faq, index) => (
                        <FAQ
                          key={faq.id}
                          index={index}
                          id={faq.id}
                          faqQuestion={faq.faqQuestion}
                          faqAnswer={faq.faqAnswer}
                        />
                      ))}
                      {magic.placeholder}
                    </Area>
                  )}
                </Droppable>
              </DragDropContext>
            </Table>
          </InputDiv>
          <ExpDiv>
            <Exp>
              ※ 드래그 앤 드롭으로 FAQ 순서를 변경할 수 있습니다.
              <br />
              자주하는 질문을 미리 등록하여 빠르게 응답할 수 있습니다.
            </Exp>
          </ExpDiv>
        </Block>
        <Button form="total">생성하기</Button>
      </FormContainer>
    </Container>
  );
}

// 페이지 전체
const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: whitesmoke;
`;

// useForm + 다른 form 모두 포함
const FormContainer = styled.div`
  width: 1280px;
  margin-top: 68px;
`;

// form 항목
const Block = styled.div`
  background-color: white;
  min-height: 50px;
  margin: 1rem;
`;

// form 제목
const FormTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  padding: 1rem;
`;

const InputTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  padding: 1rem;
  border-bottom: 1px solid whitesmoke;
`;

// 필수 항목 (*)
const Required = styled.span`
  font-size: 16px;
  color: #ff5e57;
  margin-left: 5px;
`;

const ImgDiv = styled.div`
  display: flex;
  padding: 1rem;
`;

const Img = styled.div`
  margin-left: 1rem;
`;

const ImgList = styled.p`
  color: #575fcf;
  font-size: 14px;
  font-weight: 700;
  line-height: 19px;
  letter-spacing: -0.5px;
  margin-top: 4px;
`;

const InputDiv = styled.div`
  padding: 1rem;
`;

// 항목의 하위 항목
export const SubInputTopDiv = styled.div`
  display: flex;
  padding: 0 0 1rem 0;
  border-bottom: 1px solid whitesmoke;
`;
export const SubInputMiddleDiv = styled.div`
  display: flex;
  padding: 1rem 0;
  border-bottom: 1px solid whitesmoke;
`;
export const SubInputBottomDiv = styled.div`
  display: flex;
  padding: 1rem 0 0 0;
`;
export const SubTitle = styled.div`
  display: flex;
  align-items: center;
  max-width: 200px;
  width: 100%;
  font-size: 14px;
`;

const Input = styled.input`
  width: 100%;
  height: 30px;
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Select = styled.select`
  width: 250px;
  height: 30px;
`;

export const MiniInput = styled.input`
  width: 250px;
  height: 30px;
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

// 상세설명
const TextArea = styled.textarea`
  resize: none; // 크기 고정
  margin-bottom: 2px;
  width: 100%;
  height: 200px;
`;

// 에러 메시지
export const ErrorMessage = styled.p`
  margin-top: 3px;
  font-size: 11px;
  color: #ff5e57;
`;

// 참고
export const ExpDiv = styled.div`
  padding: 0 1rem 1rem 1rem; // 상우하좌
`;
export const Exp = styled.span`
  font-size: 11px;
  color: #808e9b;
`;

// 상품 상세 이미지
const Files = styled.input`
  display: none;
`;
const ImgBox = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  border: 2px dotted #808e9b;
  cursor: pointer;
`;
const ImgBoxInside = styled.div`
  color: #808e9b;
  font-size: 70px;
`;

// 테이블
const Table = styled.div`
  min-height: 60px;
  width: 100%;
  border: 1px solid #d2dae2;
`;
const TableTitleDiv = styled.div`
  display: flex;
  align-items: center;
  background-color: whitesmoke;
  height: 30px;
`;
const TableTitle = styled.div`
  width: 100%;
  font-size: 14px;
  text-align: center;
`;

// 최종 제출 버튼
const Button = styled.button`
  margin-top: 35px;
  margin-bottom: 150px;
  border-radius: 10px;
  border: none;
  width: 100%;
  height: 55px;
  font-size: 18px;
  font-weight: bold;
  background-color: ${(props) => props.theme.buttonColor};
  color: white;
  cursor: pointer;
`;

// Drag and Drop 가능한 범위
const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.isDraggingFromThis
      ? "b2bec3"
      : "tranparent"};
  transition: background-color 0.3s ease-in-out;
`;

export default CreateMoim;
