import React, { useState, useEffect } from 'react';
import { Layout, PageHeader, Card, Col, Row, Avatar, Modal, Descriptions,Image } from 'antd';
import '../App.css';
import Button from 'antd/lib/button/button';
const { Header, Footer, Content } = Layout;
const { Meta } = Card;

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [idBook,setIdBook] = useState(null)

  const [books, setBooks] = useState([]);
  useEffect (() => {
    const getBooks = async () => {
      const data = await fetch(
        'https://stark-spire-22280.herokuapp.com/api/books'
      );
      const json = await data.json();
      console.log('json', json);
      setBooks(json.data);
      return json;
    };
    getBooks();
  }, []);

  const [bookDetails, setBookDetails]=useState({});
  useEffect (()=>{
    const getBookDetails =async()=>{
      if(idBook){
        const data = await fetch(
          `https://stark-spire-22280.herokuapp.com/api/books/${idBook}`
        );
        const json = await data.json();
        console.log('json',json)
        setBookDetails(json);
        setIsModalVisible(true);
      }
    };
    getBookDetails();
  },[idBook]);
  
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Layout>
        <Header className='ant-layout-content-header'>
          <PageHeader className='site-page-header' title='Libros' />
        </Header>
        <Content className='background'>
          <h1>Libros disponibles</h1>
          <div className='site-card-wrapper'>
            <Row gutter={16}>
              <Col span={8}>
                {books.map((book,index) => {
                  return (
                    <Card
                      key={book.id}
                      style={{ width: 400 }}
                      actions={[
                        <Button onClick={() => setIdBook(book.id)}>
                          Ver mas
                        </Button>,
                      ]}
                      bordered={false}>
                      <Meta
                        avatar={<Avatar src={book.cover_page} />}
                        title={book.title}
                        description={[book.author + ' ' + book.year_edition]}
                      />
                    </Card>
                  );
                })}
</Col>
</Row>        
          </div>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
      <Modal
        class='modal-detalles'
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        Footer={null}
        >
          <Descriptions title='Detalles del libro' style={{textAlign:'center'}}>
            <Row>
              <Col style={{textAlign:'left'}}>
                <Descriptions.Item >{bookDetails.title}</Descriptions.Item><br/>
                <Descriptions.Item >{bookDetails.author}</Descriptions.Item><br/>
                <Descriptions.Item >{bookDetails.year_edition}</Descriptions.Item><br/>
                <Descriptions.Item >{bookDetails.price}</Descriptions.Item><br/>
                <Descriptions.Item >{bookDetails.synopsis}</Descriptions.Item><br/>
                <Descriptions.Item >
                  {
                    bookDetails.available?'Disponible':'Agotado'
                  }
                </Descriptions.Item><br/>
              </Col>
              <Col>
                <Row>
                  <Col><Image src={bookDetails.cover_page}></Image></Col>
                  <Col><Image src={bookDetails.back_cover}></Image></Col>
                </Row>
              </Col>
            </Row>
        </Descriptions>
        
      </Modal>
    </>
  );
}

export default App;
