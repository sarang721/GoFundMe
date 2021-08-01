import React, { Component } from 'react'
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import {Link} from '../routes';
import Campaign from '../ethereum/campaign';

//npm run dev : to run the project

class CampaignIndex extends Component {

    constructor(props){
        super(props);
        this.state = {
          items: null,
          summary: null
        }
      }


    static async getInitialProps(ctx) {
        console.log(factory);
        const campaigns = await factory.methods.getDeployedCampaigns().call()
        return { campaigns: campaigns };
    }

    async componentDidMount(){
        const c = Campaign(this.props.campaigns[0]);
        const summary = await Promise.all(this.props.campaigns.map((campaign, i) => Campaign(this.props.campaigns[i]).methods.getSummary().call()));
        this.setState({summary});
      }

    
    rendercampaigns() {
        let summ;
        console.log(this.state.summary);
        const items = this.props.campaigns.map((address,i) => {
            if (this.state.summary) 
            summ = this.state.summary[i];
            else summ = {"5": "null", "7":"null"};
            return {
                image:<img src={summ[7]} style={{width:150 ,height:150}}></img>,
                header :summ[5],

                meta:address,
                description: <div>
                    <h4>{summ[6]}</h4>
                    <Link route={`/campaigns/${address}`}><a href="">View Campaign</a></Link>
                    </div>,
                fluid: true
            }
        });

        return <Card.Group items={items} />
    }

    render() {

        return (
            <div>
               
                <Layout>
                    <h3>Open Campaigns</h3>
                    <Link route="/campaigns/new">
                    <a>
                    <Button  floated="right" content='Create Campaign' icon='add circle'
                        primary
                        labelPosition='left' />
                        </a>

                        </Link>

                    {this.rendercampaigns()}

                </Layout>



            </div>);



    }

}

export default CampaignIndex;


/*
function CampaignIndex() {


    const[campaigns,fetchcampaigns]=useState([]);

    const getcampaigns=async()=>{
        const campaigns= await factory.methods.getdeployedcampaigns().call();
        fetchcampaigns(campaigns);

    }



    useEffect(() => {
      getcampaigns();

    }, [])




    const rendercampaigns=()=>{
        const items= campaigns.map((address)=>{
            return {
                header:address,
                description:<a>View Campaign</a>,
                fluid:true

            }
        })

        return items;
    }


    return(
        <>
        <div></div>
        </>
    );


}


export default CampaignIndex
*/