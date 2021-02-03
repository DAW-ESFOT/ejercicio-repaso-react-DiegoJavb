import React, { useState, useEffect } from 'react';
import { Layout, PageHeader, Card, Col, Row, Avatar, Modal, Image } from 'antd';
import '../App.css';
import Button, { convertLegacyProps } from 'antd/lib/button/button';
const { Header, Footer, Content } = Layout;
const { Meta } = Card;

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [books, setBooks] = useState([]);
  useEffect(() => {
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

  const handleShowModal = () => {
    setIsModalVisible(true);
  };
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
        <Content>
          <h1>Libros disponibles</h1>
          <div className='site-card-wrapper'>
            <Row gutter={16}>
              <Col span={8}>
                {books.map((book) => {
                  return (
                    <Card
                      key={book.id}
                      style={{ width: 400 }}
                      actions={[
                        <Button onClick={() => handleShowModal()}>
                          Ver mas
                        </Button>,
                      ]}>
                      <Meta
                        avatar={<Avatar src={book.cover_page} />}
                        title={book.title}
                        description={[book.author + '\n' + book.year_edition]}
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
        title='Detalles del libro'
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}>
        <Row>
          <Col>diego</Col>
          <Col>bacuy</Col>
        </Row>
      </Modal>
    </>
  );
}

export default App;
