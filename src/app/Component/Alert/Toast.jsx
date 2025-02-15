import { Toast } from 'react-bootstrap';
import {Image} from 'react-bootstrap';

export default function SuccessToast(props){
    return(
      <>
      <div aria-live="polite" aria-atomic="true" className={`${props.status ? 'd-flex' : 'd-none'} justify-content-center align-items-center`} 
          style={{
              position: 'absolute',
              left:"34%",
              minHeight: '250px',
          }}>
          <Toast>
              <Toast.Header>
                  <Image src="https://fakeimg.pl/20x20/754FFE/754FFE/" className="rounded me-2" alt="" />
                  <strong className="me-auto">{props.res}</strong>
                  <small>1 second ago</small>
              </Toast.Header>
              <Toast.Body>{props.message}</Toast.Body>
          </Toast>
      </div>
      </>
    )
  }