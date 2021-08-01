import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import {Form ,Button,Message,Input} from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import {Link,Router } from '../../../routes';
import { event } from 'jquery';


class RequestNew extends Component{



    state={

        value:"",
        description:'',
        recipient:'',
        loading:false,
        errormessage:'',

    }

    static async getInitialProps(props){
        const address=props.query.address;
        return {address:address};
    }

    onSubmit=async(event)=>{

        event.preventDefault();
        const campaign=Campaign(this.props.address);

        const {description,value,recipient}=this.state;

        this.setState({loading:true,errormessage:""})

        try{
            const account=await web3.eth.getAccounts();

            await campaign.methods.createRequest(description,web3.utils.toWei(value,'ether'),recipient)
            .send({
                from:account[0]
            })

            Router.pushRoute(`/campaigns/${this.props.address}/requests`);

        }

        catch(e){
            this.setState({errormessage:e.message})

        }
        this.setState({loading:false});
       

    }

    render(){
        return(
            <Layout>
                <Link style={{marginTop:10}} route={`/campaigns/${this.state.address}/requests`}>
                <a style={{marginTop:20}}>Back</a>
                </Link>
        <h2>Create a Request</h2>
        <Form onSubmit={this.onSubmit} error={!!this.state.errormessage}>
            <Form.Field>
                <label>Description</label>
                <Input value={this.state.description} onChange={event=>this.setState({description:event.target.value})} ></Input>
            </Form.Field>

            <Form.Field>
                <label>Value in Ether</label>
                <Input value={this.state.value} onChange={event=>this.setState({value:event.target.value})} ></Input>
            </Form.Field>
            <Form.Field>
                <label>Recipient </label>
                <Input value={this.state.recipient} onChange={event=>this.setState({recipient:event.target.value})} ></Input>
            </Form.Field>
            <Message error header="oops!" content={this.state.errormessage}></Message>
            <Button  loading={this.state.loading} primary>Create!</Button>
        </Form>
        </Layout>
        
        );
    }

}

export default RequestNew;