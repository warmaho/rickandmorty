import React from 'react';
import { Layout, Table, Pagination , Button, Spin } from 'antd';
import styles from './home.less';
import { Link } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import MainLayout from '../layout/';
import { getCharacter } from 'rickmortyapi'

const {
  Content,
} = Layout;

const Home = () => {

  const [state, setState] =React.useState({
    data:[],
    count:0,
    loading:true,
    loadingTable:false,
  });


  const [current, setCurrent]=React.useState(1);
  const [data, setData]=React.useState([]);

  const movePagination =(page)=>{
    setCurrent(page);
    getData(page);
  };
  const getData = async (page) =>{
    const chars = await getCharacter({page:page});
    setState({...state,data:chars.results,loadingTable:false, loading: false, count:chars.info.count});
    console.log(localStorage.getItem('all'))
    if(data.length===0 && localStorage.getItem('all')===null){
      localStorage.setItem('all',JSON.stringify(chars.results) );
      localStorage.setItem('deleted',JSON.stringify([]) );
      setData(chars.results);
    }else {
      let all = JSON.parse(localStorage.getItem('all'));
      let news =chars.results;
      const dataIds = new Set(all.map(({ id }) => id));
      const combined = [
        ...all,
        ...news.filter(({ id }) => !dataIds.has(id))
      ];
      localStorage.removeItem('all');
      localStorage.setItem('all',JSON.stringify(combined) );
      setData(combined);

    }
  };
  const removeList = (id) =>{
    let all = JSON.parse(localStorage.getItem('all'));
    let deleted = JSON.parse(localStorage.getItem('deleted'));
    let remove = all.filter(x => x.id !== id);
    let add = all.find(x => x.id === id);
    deleted.push(add);
    localStorage.removeItem('deleted');
    localStorage.setItem('deleted',JSON.stringify(deleted) );
    localStorage.removeItem('all');
    localStorage.setItem('all',JSON.stringify(remove) );
    setData(remove);
  };

  React.useEffect( ()=>{
    setState({...state,loadingTable:true});
    getData();
  },[])

  React.useEffect( ()=>{
    setState({...state,loadingTable:true});
    getData();
  },[])

  const columns = [
    {
      title: 'Imagen',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <img className={`${styles['img']}`} src={image} alt=""/>
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Genero',
      dataIndex: 'gender',
      key: 'gender'
    },
    {
      title: 'Especie',
      dataIndex: 'species',
      key: 'species'
    },
    {
      title: 'Origen',
      dataIndex: 'origin.name',
      key: 'origin.name'
    },

    {
      title: 'Acciones',
      key: 'action',
      render: (data) => {
        return ([
              <div>
                <Link to={{
                  pathname: '/detail',
                  state: {
                    data: data,
                    disabled:true,
                  }
                }}>
                  <Button  className={`${styles['space']}`}>Detalles</Button>
                </Link>
                <Link to={{
                  pathname: '/detail',
                  state: {
                    data: data,
                    disabled:false,
                  }
                }}>
                  <Button  className={`${styles['space']}`}>Editar</Button>
                </Link>

                  <Button  onClick={()=>removeList(data.id)} className={`${styles['space']}`} danger="true">Eliminar</Button>

              </div>


            ]
        )
      }

    },

  ];



  return(
      <MainLayout>
        {state.loading ?
            <Content  className={`${styles['min']}`}>
              <Spin size="large" />
            </Content>:
            <Content>
              <div className={`${styles['add']}`}>
                <Link to={{
                  pathname: '/detail',
                  state: {
                    disabled:false,
                  }

                }}>
                  <Button  className={`${styles['space']}`} type="primary">Agregar Nuevo</Button>
                </Link>
              </div>
              <Table
                  rowKey="id"
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                  loading={state.loadingTable}
              />
              <div  className={`${styles['paginator']}`}>
                <Button type="primary" loading={state.loadingTable} onClick={() =>movePagination(current+1)}>
                  Ver más!
                </Button>
                {/*<Pagination onChange={movePagination} defaultCurrent={1} defaultPageSize={20} total={state.count}  />*/}
              </div>
            </Content>

        }
      </MainLayout>
  )
};


export default Home;
