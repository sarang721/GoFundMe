import React, { Component } from 'react';
import { Card ,Grid,Button} from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign'; 
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import {Link} from '../../routes';

class Campaignshow extends Component{


    static async getInitialProps(props){

        const campaign=Campaign(props.query.address);
        const summary=await campaign.methods.getSummary().call();
        console.log(summary);

       
        return{
            
            address:props.query.address,
            minimumContribution:summary[0],
            balance:summary[1],
            requestsCount:summary[2],
            approversCount:summary[3],
            manager:summary[4],
            name: summary[5],
            description: summary[6],
            image: summary[7],
            target: summary[8]
    
        };


    }


    renderCards(){

        const {
            balance,
            manager,
            minimumContribution,
            requestsCount,
            approversCount,
            target
        }=this.props;
        const items=[
            {
                header:manager,
                meta:"Address of manager",
                description:"The Manager created this campaign and can create a request to withdraw funds",

                style:{overflowWrap:'break-word'}
            },

            {
                header:minimumContribution,
                meta:"Minimum Contribution(wei)",
                description:"You must contribute atleast this much wei to become approver"
            },

            {
                header: requestsCount,
                meta: 'Number of Requests',
                description:
                  'A request tries to withdraw money from the contract. Requests must be approved by approvers'
              },
              {
                header: approversCount,
                meta: 'Number of Contributors',
                description:
                  'Number of people who have already donated to this campaign'
              },
              {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign Balance (ether)',
                description:
                  'The balance is how much money this campaign has left to spend.'
              },
              {
                header: web3.utils.fromWei(target, 'ether'),
                meta: 'Amount Needed (ether)',
                description:
                  'Amount of contibution needed to further process'
              }
        ];

            return <Card.Group items={items}></Card.Group>

    }
    render(){
        return(
            <Layout>
                <h3>Campaign Details</h3>
                <Grid >
                    <Grid.Column width={10}>
                {this.renderCards()}
                <Link route={`/campaigns/${this.props.address}/requests`}>
                    <a>
                        <Button style={{marginTop:10}} primary>Requests</Button>
                    </a>

                </Link>
                </Grid.Column>

                <Grid.Column width={5}>
                <ContributeForm address={this.props.address}></ContributeForm>
                </Grid.Column>
                </Grid>
                
            </Layout>
        );
    }
}

export default Campaignshow;