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
        
          <PageHeader title='Libros' />
        
        <Content className='background'>
          <div style={{display:'flex'}}>
            <Row gutter={15} style={{display:'flex'}}>
                {books.map((book,index) => {
                  return (
                    <Card
                      key={book.id}
                      style={{ width: 400,display:'block' }}
                      bordered={false}
                      >
                      
                        <div style={{display:'flex'}}> 
                        <Row  gutter={15} justify="center">
                          <Col className='gutter-row'>
                          <div className="border-details">
                            <img
                              alt={book.title}
                              src={book.cover_page}
                             style={{ width: 100, height: 150  }}/>
                            </div>
                          </Col>
                        </Row>
                        <Col>
                          <div>
                            <h2 style={{fontWeight: 'light'}}>{book.title}</h2>
                            <h3>{book.author} </h3>
                            <h3> {book.year_edition}</h3>
                            <h3>${book.price}</h3>
                            <Button className='botonSee' onClick={() => setIdBook(book.id)}>Ver mas...</Button>
                          </div>
                        </Col>
                      </div> 
                    </Card>
                  );
                })}
             
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
              <Col className='modal-col' >
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
              <Col className='modal-col'>
                <Row style={{display:'flex'}}>
                  <Col className='image_detail'><Image src={bookDetails.cover_page}></Image></Col>
                  <Col style={{width:15}}></Col>
                  <Col className='image_detail'><Image src={bookDetails.back_cover}></Image></Col>
                </Row>
              </Col>
            </Row>
        </Descriptions>
        
      </Modal>
    </>
  );
}

export default App;
