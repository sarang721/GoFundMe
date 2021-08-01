import React, { Component } from 'react';
import {Link} from '../../../routes';
import {Button,Tab,Table} from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import Layout from '../../../components/Layout'
import { compose } from 'underscore';
import RequestRow from '../../../components/RequestRow';

class RequestIndex extends Component{

    static async getInitialProps(props){
        const address=props.query.address;
        const campaign=Campaign(address);
        const requestCount=await campaign.methods.getRequestsCount().call(); 
        const approvercount=await campaign.methods.approversCount().call();
       // console.log(typeof(requestCount));

        const requests = await Promise.all(
            Array(parseInt(requestCount)).fill().map((element,index) =>{
              return campaign.methods.requests(index).call()
            })
          );
      
          //console.log(requests);

        return {address:address,requests:requests,approverc:approvercount,reqcount:requestCount};
    }

    renderRows(){
        return this.props.requests.map((request,index) => {
          return (
            <RequestRow
            approvercount={this.props.approverc}
              key={index}
              id={index}
              request={request}
              address={this.props.address}
            
            />
          );
        });
      }

    render(){

        const {Header,Row,HeaderCell,Body}=Table;
        return(
            <Layout>
            <h2>Requests </h2>
            <Link route={`/campaigns/${this.props.address}/requests/new`}>
            <a>
                <Button primary >Add Request</Button>
            </a>
            </Link>
            <Table>
                <Header>
                    <Row>
                        <HeaderCell>ID</HeaderCell>
                        <HeaderCell>Description</HeaderCell>
                        <HeaderCell>Amount</HeaderCell>
                        <HeaderCell>Recipient</HeaderCell>
                        <HeaderCell>ApprovalCount</HeaderCell>
                        <HeaderCell>Approve</HeaderCell>
                        <HeaderCell>Finalize</HeaderCell>
                    </Row>
                </Header>
                <Body>
                    {this.renderRows()}
                </Body>
            </Table>

            <h3>Found {this.props.reqcount} requests</h3>


            </Layout>
        );
    }
}

export default RequestIndex;