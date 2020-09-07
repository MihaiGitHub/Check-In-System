import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const CheckIn = () => {
    return (
    <main role="main" className="container" style={{ maxWidth: '100%' }}>
<section id="tabs">
	<div className="container" style={{ maxWidth: '100%' }}>
		<div className="row">
			<div className="col-xs-12" style={{ width: '100%' }}>
				<nav>
					<div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist" style={{ backgroundColor: 'white' }}>
						<a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Check In</a>
						<a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Serving</a>
						<a className="nav-item nav-link" id="nav-about-tab" data-toggle="tab" href="#nav-about" role="tab" aria-controls="nav-about" aria-selected="false">Check Out</a>
					</div>
				</nav>
				<div className="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
					<div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
          <div className="table-wrapper-scroll-y my-custom-scrollbar">

<table className="table table-bordered table-striped mb-0">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
    </tr>
  </thead>
  <tbody>
    <tr data-toggle="modal" data-id="1" data-target="#exampleModal">
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
    </tr>
    <tr data-toggle="modal" data-id="1" data-target="#exampleModal">
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
    </tr>
    <tr data-toggle="modal" data-id="1" data-target="#exampleModal">
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
    </tr>
    <tr data-toggle="modal" data-id="1" data-target="#exampleModal">
      <th scope="row">4</th>
      <td>Mark</td>
      <td>Otto</td>
    </tr>
    <tr data-toggle="modal" data-id="1" data-target="#exampleModal">
      <th scope="row">5</th>
      <td>Jacob</td>
      <td>Thornton</td>
    </tr>
    <tr data-toggle="modal" data-id="1" data-target="#exampleModal">
      <th scope="row">6</th>
      <td>Larry</td>
      <td>the Bird</td>
    </tr>
    <tr data-toggle="modal" data-id="1" data-target="#exampleModal">
      <th scope="row">7</th>
      <td>Jacob</td>
      <td>Thornton</td>
    </tr>
    <tr data-toggle="modal" data-id="1" data-target="#exampleModal">
      <th scope="row">8</th>
      <td>Jacob</td>
      <td>Thornton</td>
    </tr>
  </tbody>
</table>

</div>
<Link to="/CheckInForm" style={{ textDecoration: 'none' }}>
  <button type="button" class="btn btn-success btn-lg btn-block">
    Check In
  </button>	
</Link>

          </div>
					<div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
          <div className="table-wrapper-scroll-y my-custom-scrollbar">

<table className="table table-bordered table-striped mb-0">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
    </tr>
  </thead>
  <tbody>
    <tr data-toggle="modal" data-id="1" data-target="#servingModal">
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
    </tr>
    <tr data-toggle="modal" data-id="1" data-target="#servingModal">
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
    </tr>
    <tr data-toggle="modal" data-id="1" data-target="#servingModal">
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
    </tr>
    <tr data-toggle="modal" data-id="1" data-target="#servingModal">
      <th scope="row">4</th>
      <td>Mark</td>
      <td>Otto</td>
    </tr>
    <tr data-toggle="modal" data-id="1" data-target="#servingModal">
      <th scope="row">5</th>
      <td>Jacob</td>
      <td>Thornton</td>
    </tr>
    <tr data-toggle="modal" data-id="1" data-target="#servingModal">
      <th scope="row">6</th>
      <td>Larry</td>
      <td>the Bird</td>
    </tr>
    <tr data-toggle="modal" data-id="1" data-target="#servingModal">
      <th scope="row">7</th>
      <td>Jacob</td>
      <td>Thornton</td>
    </tr>
    <tr data-toggle="modal" data-id="1" data-target="#servingModal">
      <th scope="row">8</th>
      <td>Jacob</td>
      <td>Thornton</td>
    </tr>
  </tbody>
</table>

</div>
					</div>
					<div className="tab-pane fade" id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">
          <div className="table-wrapper-scroll-y my-custom-scrollbar">

<table className="table table-bordered table-striped mb-0">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
    </tr>
    <tr>
      <th scope="row">4</th>
      <td>Mark</td>
      <td>Otto</td>
    </tr>
    <tr>
      <th scope="row">5</th>
      <td>Jacob</td>
      <td>Thornton</td>
    </tr>
    <tr>
      <th scope="row">6</th>
      <td>Larry</td>
      <td>the Bird</td>
    </tr>
    <tr>
      <th scope="row">7</th>
      <td>Jacob</td>
      <td>Thornton</td>
    </tr>
    <tr>
      <th scope="row">8</th>
      <td>Jacob</td>
      <td>Thornton</td>
    </tr>
  </tbody>
</table>

</div>
					</div>
				</div>
			
			</div>
		</div>
	</div>
</section>
<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Move client to Serving</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        Move John Smith to Serving?
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Move</button>
      </div>
    </div>
  </div>
</div>
<div className="modal fade" id="servingModal" tabIndex="-1" role="dialog" aria-labelledby="servingModal" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Move client to Check Out</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        Move John Smith to Check Out?
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Move</button>
      </div>
    </div>
  </div>
</div>
    </main>
    );
}

export default CheckIn;