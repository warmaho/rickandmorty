import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Affix, BackTop, Button, Drawer, Icon, Layout,
} from 'antd';
import styles from '../home/home.less';

const {
  Header, Footer,
} = Layout;

const Index = (props) =>{
  const [state, setState] = React.useState({
    visible: false,
  });

   const showDrawer = () => {
    setState({
      visible: true,
    });
  };

  const onClose = () => {
    setState({
      visible: false,
    });
  };
  const restart = () => {
    localStorage.clear();
    window.location.href="/";
  };
  const { children } = props;

  return(

      <div>
        <Layout>
          <div>
            <BackTop />
          </div>
          <Affix offsetTop={0}>
            <Header className={styles['header-layout']}>
              <Link to="/">
                <span style={{ color: '#fff' }}>
                  <strong>Rick & Morty</strong>
                </span>
              </Link>
              <Button type="primary" shape="circle" onClick={showDrawer}>
                <Icon type="bars" theme="outlined" />
              </Button>
              <Drawer
                  title="Menu"
                  placement="right"
                  closable={false}
                  onClose={onClose}
                  visible={state.visible}
              >
                <p><Link to="/">Home</Link></p>
                <p><Link to="/detail">Detail</Link></p>
                <p><a onClick={restart}>Reset APP</a></p>
              </Drawer>
            </Header>
          </Affix>
          { children }
          <Footer className={styles['align-center']}>
            Ejercicio de programación en React
          </Footer>
        </Layout>
      </div>

  )
}
export default Index
