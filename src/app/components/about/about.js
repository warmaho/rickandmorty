import React from 'react';
import {Button, Col, Input, Layout, Row} from 'antd';
import styles from './about.less';
import MainLayout from '../layout/';

const {
  Content,
} = Layout;

const About = (props) =>  {
  const [data, setData]=React.useState(null);
  const [save, setSave]=React.useState({});
  const [disabled, setDisabled]=React.useState(false);
  const [template, setTemplate]=React.useState([
    {image: ""},
    {episode: []},
    {gender: ""},
    {location: {name: ""}},
    {name: ""},
    {origin: {name: ""}},
    {species: ""},
    {status: ""},
    {type: ""},
  ]);

  React.useEffect(()=>{
    console.log(props)
    if(props.location.state!==undefined){
      if(props.location.state.data!==undefined){
        setData(props.location.state.data)
        setDisabled(props.location.state.disabled)
      }
    }

  },[])

  const editInfo = () =>{
    let all = JSON.parse(localStorage.getItem('all'));
    let remove = all.filter(x => x.id !== data.id);
    let add = all.find(x => x.id === data.id);
    if(save.episode)
    add.episode= [save.episode];
    if(save.gender)
    add.gender= save.gender;
    if(save.image)
    add.image= save.image;
    if(save.location)
    add.location.name= save.location;
    if(save.name)
    add.name= save.name;
    if(save.origin)
    add.origin.name=save.origin;
    if(save.species)
    add.species= save.species;
    if(save.status)
    add.status= save.status;
    if(save.type)
    add.type=save.type;
    remove.push(add);
    localStorage.removeItem('all');
    localStorage.setItem('all',JSON.stringify(remove) );
    window.location.href="/"
  };
  const addInfo = () =>{
    let newSave={
      created: new Date(),
      episode: [save.episode],
      gender: save.gender,
      id: Math.random(),
      image: save.image,
      location: {name: save.location, url: ""},
      name: save.name,
      origin: {name: save.origin, url: ""},
      species: save.species,
      status: save.status,
      type: save.type,
      url: "",
    };
    let all = JSON.parse(localStorage.getItem('all'));
    all.push(newSave);
    localStorage.removeItem('all');
    localStorage.setItem('all',JSON.stringify(all));
    window.location.href="/"

  };
  return (
      <MainLayout>
        <Content className={`${styles['min-h']}`}>
          <Row justify="center" align="top" className={`${styles['p-4']}`}>
            <Col span={20} offset={2}>
              <Row>
                <Col span={6}>
                  {data!==null && data!==undefined ?
                      <img src={data.image} alt=""/>:
                      <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMPEhUQDxMQDxUPEBcSFhYXFhAVEBAQFxcXFhgSGBMYHSggGBolGxcTITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0ODw0PDisZFRkrNysrKystLSsrLSstLSstKysrKys3KysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABgcBBAUDAv/EAD4QAAIBAgMEBggFAgUFAAAAAAABAgMRBAUhBhIxURNBYXGBkQciMjNCUqGxFHJzssGS4SNTgtHwJENiY6L/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAWEQEBAQAAAAAAAAAAAAAAAAAAARH/2gAMAwEAAhEDEQA/ALxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYBkAAAAAAAAAAAAAAAGvjcZTox36sowiut/xzIdm23XGOFhf/wA5/wAR/wBwJvKVtXoc/E59h6Wk61NeN/sVdjs1rV3erUlLsvaPkjTAtF7XYT/M+jPbD7S4Wo7KtBN9TuvuVQYaAu2lVUleLUlzVmj7KZwOYVaD3qU5Q8dH2NE0yLbSM2oYq0HwU17DfauoCZA+YyT1Wqfkz6AAAAAAAAAAAAAAAAAAAAAAAAAGnmmYQw1OVWo7KK4dcn1JG4Vtt5mjq1uhi/Vo8e2b4+QHGzfNamKm51G7X9WPwwXJLyNIwjJpkAAAAAAwAJJsttPLDtUqzcqTfFu7p/27CyKVRTSlFqSaumuDXMpMl+wufOEvw1V+rL3bfwy+XxJViwAECKAAAAAAAAAAAAAAAAAAAAANbMMSqVOdR8IQcvIpqpUc25S4ye8+9ll7eYjcwsl11JKH8/wVmAABpkAAAAAAAAEZNNNaNO67GABbuQY/8TQhV63Gz/MtGdIhfo3xF4VKT+GSkvHj/BNDLQAAAAAAAAAAAAAAAAAAAAAhfpJq+pSjzm35L+5BCwfSNht6jCov+3Us+xNP+xXxUAAVAAAAAAAAAAAS70bS/wAaqv8A1J//AEiwSDejfDe9qvsgvuycmWgAAAAAAAAAAAAAAAAAAAABoZ3gunoVKXzR0/MtV9Sn7NaO6adn2MurEVNyMpfLFvyRTOJrupOU2knOTk0uCuB5gA0yAAAAAAAAGGzJ6YapGM4ymt6MZptc0ndoC0tk8B+Hw0IvSUlvy75a/ax2TxwlZVIRnHhKKa7mj2MtAAAAAAAAAAAAAAAAAAAAADwxkN6E1zi19ClkXfJX8SmcxoOnVqQatu1GvC+gGuADTIAAAAAAAAYaMn1TjvSUV8UkvNgW9kcbYekn/lR+xvnlh6e7GMflil9D1MtAAAAAAAAAAAAAAAAAAAAAAQbbzJG/+qprgrVF2L4icnxVgpJxeqkrPuYFJg3c6wDw1edJ8FL1e2D4GkVAAFQAAAAADubIZXKvXjK3qUZKUn1XWqj5nHw9CVScacFdzdl3stzJMtjhqUaUepavrlLrZKsbyMgEUAAAAAAAAAAAAAAAAAAAAAAABDvSDle/BYiC1p6S5uD6/AgCLgz9L8NWvw6Gf2ZT6LEZABUAAAAMEVL/AEe5cp1JV5a9H6sfzPi/IsBEU9HULYeT51n9EiWEUAAAAAAAAAAAAAAAAAAAAAAAAAPmU7K70S18OYHG2w33haipreuvW57nX9CqkXHl+KjXi5xalFycV3J2INtjs46EnXoq9OT9ZJe7fPuKmIsACoAAAYPqnFyajFOTfBK7bfcTHIdi3K08VomtKa4/6mSrjs7BW/CpJ3e/JvmmSQ5WKhTwq6WO7ThBKMkklFxvZeKOlTmpJSVmmrprg0RX2AAAAAAAAAAAAAAAAAAAMNnNzLPaGH95UV/lWsn4IDpmLkFx23r4UKS753/ajg4zabFVdHUcU+qPqoCz8bmNKir1Zxh3vXy4kF2m2t6eLpYe8YP2pPSUlyS6kRScnJ3bbfNu78wVEx9HmZbspYeT0kt6HevaX2J5OCkmpJNNWafBoprLsU6NWFVfBNPwvqi5KNRTipLVSV13MlVANpdkJU26uGW9Di4cZR7VzREny/4uwu4ie2eU4fcdecuhn1NL3kuTiuL7Sory51clyGri36i3Ydc37K7ubN7YvKqGJm+mk3KGqp8IyXNvr7iyqVNRSjFKKXBKyS8AY5WR7P0sIvUW9N8Zv2n3cjrhmpm2OWHpSqy+FaLm+pEVDfSDmu9JYaD0jaU/zdSPTYbP7WwtV/pt/sIbXrupJzk7ubu32s+E7arRrVdjAu5MyVvlu21aklGrGNVLS+qnbv4MkuA2yw1TScnSfKSdr96AkYPKhiIVFeEoyXY0z1uAAAAAAAAAMHAzfauhhm43dWa+GPU+TZEsy2yxFXSnajHss5W/My4LExePp0VerOEF2tIjWY7c0oaUYSqvm/Vj5kArVpTe9OUpvm22fIR2cx2nxNfRzdOL+GGn14nGbvq22+fWAMNAAVAAAYZZ2w+O6XDRi3eVJuD7r3T8rFZEm2Ax3R4h0m9K0dPzrh9LkVY85JJt6JK75JFVbVZw8VWdr9HTbjBdT5y8Scba1pwws3Tvq0pPrUG9X/BVwG3lWNeHqxqx+B6rnHrXkXBhqyqRjOOqkk0+xlKssX0fYicsPKMvZpztF81a9vBgSlkA9IOab81hovSn60teMmtF5E2zPFqhSnVlwhBvvaWiKexNd1JyqS1c5OT8SK8kZANMgACvShiJ03enOcH2Nr7HdwO2eJpaTcayXzaS/qRHgQ1YmX7c0Z2VWMqL/qj5okWEzClWV6U4T7mmUyfVOpKDvByi+abT+gF2XMlX5btfiaWk2q0eUrX/AKkTDKNrKGItFt0Zv4ZWs+6XBkVIAeXTx+aPmgBTmZL/ABqv6s/3M8DYzL31X9Wf7ma5pkAAAAAAAAAAA9MLiHSnGpHjCSkvA8wFXLFxr07+1GrDwaaKozvLXha0qT4J3i+cHwJzsDj+kw/Rt3dGW727r1X8nF9I0101Jdapu/PV6GYqIst7Z/CKjh6cF1QTfbJ6sqJPh3l04V3hFrrivsioi3pFxW7RhTT95O77VH+7RX5JdvsX0mI3FwpRt3Sdm/4I0IAAKgAAAAAAAAYsZAC/awABsZl76r+rP9zNc2My99V/Vn+5muAAAAAAAAAAAAwZAVIdhsd0WJUG9Kycf9XFf7GNuqu9i2vkhFeOtzhUKrhKM1xjJNeBsZxjOnrTq/O0+7TgTBptFs5DjVLCQqt+zT17N1a/Yqc7eAzro8FVw9/WnJbvH2ZW3vt9QOVjsS6tWdR/HNy7k3ovKx4mEZAAAqAAAAAAAAAAAAADYzL31X9Wf7ma4AAAAAAAAAAAAAAAAAUMS6gABkAAAAgAAAAAAAAAAAAA/9k=" alt=""/>
                  }
                </Col>
                <Col span={18}>
                  <Row justify="space-around" align="middle" gutter={[16, 16]}>
                    {data!==null && data!==undefined && template.map(e=>{
                      let output="";
                      for(let i in e){
                        output+=i;
                      }
                      return ([
                        <Col span={12}>
                          <Input addonBefore={output} size="large" disabled={disabled} onChange={value => setSave({...save,[output]:value.target.value})} defaultValue={data[output].name===undefined?data[output]:data[output].name} />
                        </Col>
                      ])
                    })}
                    {(data===null || data===undefined) && template.map(e=>{
                      let output="";
                      for(let i in e){
                        output+=i;
                      }
                      return ([
                        <Col span={12}>
                          <Input addonBefore={output} size="large" disabled={disabled} onChange={value => setSave({...save,[output]:value.target.value})} defaultValue="" />
                        </Col>
                      ])
                    })}
                  </Row>
                </Col>
              </Row>
            </Col>

          </Row>
          {!disabled &&
          <div className={`${styles['add']}`}>
            {data!==null && data!==undefined ?
                <Button onClick={editInfo} type="primary">Guardar</Button>
                :
                <Button onClick={addInfo} type="primary">Agregar</Button>
            }
          </div>
          }
        </Content>
      </MainLayout>
  );
}

export default About;
