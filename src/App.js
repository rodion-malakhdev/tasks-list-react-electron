import React, {useCallback, useEffect, useMemo, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Task} from "./API/task";
import { Button, Pagination, Modal, Form, ListGroup, Container } from 'react-bootstrap';

const limit = 10;

function App() {

  const [offset, setOffset] = useState(0);
  const [list, setList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [show, setShow] = useState(false);
  const [ description, setDescription ] = useState('');
  const [ activePage, setActivePage ] = useState(0);

  const loadTasks = useCallback(() => {
      const { count, rows } = Task.list(offset, limit);
      setTotalCount(count);
      setList(rows);
  }, [offset]);

  const handlePaginationClick = useCallback((i) => {
      setOffset(limit * i);
      setActivePage(i)
  }, [setOffset, setActivePage])

  const paginationData = useMemo(() => {
      const pagesLength = Math.ceil(totalCount / limit);
      return totalCount > 10 ? new Array(pagesLength).fill(null).map((_,i) => {
          return <Pagination.Item onClick={() => handlePaginationClick(i)} active={activePage === i}>{i + 1}
          </Pagination.Item>
      }) : null;
  }, [totalCount, setOffset, offset])

  const saveTask = useCallback(() => {
      Task.add({ description });
      setDescription('');
      setShow(false);
      loadTasks();
  }, [description, loadTasks, setShow, setDescription ]);

  useEffect(() => {
      loadTasks();
  }, [loadTasks]);
  return (
    <div className="App">
        <Container>
                <Button variant="primary" className="m-2" onClick={() => setShow(true)}>add task</Button>
                <ListGroup className="m-2" style={{minHeight: '500px'}}>
                    {list.map(({description, id}) => <ListGroup.Item key={id}>{description}</ListGroup.Item>)}
                </ListGroup>
                <Pagination className="m-2">
                    {paginationData}
                </Pagination>
        </Container>
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>New task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Control type="text" placeholder="Description" onChange={({target}) => setDescription(target.value)} />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => saveTask()}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
  );
}

export default App;
