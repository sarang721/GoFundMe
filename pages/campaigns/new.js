import { deflate } from 'pako';
import { Form ,Button,Input,Message} from 'semantic-ui-react';
import React,{Component} from 'react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { event } from 'jquery';
import {Router} from '../../routes';

class CampaignNew extends Component{

    state={
        minimumcontribution:'',
        errormessage:'',
        loading:false,
        description:'',
        campaignName:'',
        target:'',
        imageUrl:'',


    };

    

    onsubmit=async(event)=>{

            event.preventDefault();

            this.setState({loading:true,errormessage:""});
            try{
            const accounts=await web3.eth.getAccounts();
            await factory.methods
            .createCampaign(this.state.minimumcontribution,this.state.campaignName,this.state.description,this.state.imageUrl,this.state.target)
            .send({
                from:accounts[0],
            });

            Router.pushRoute('/');
        }
        catch(e){
            this.setState({errormessage:e.message});

        }

        this.setState({loading:false});



    }
    render(){
        return (
                <Layout>
                <h3>Create a Campaign</h3>
                <Form error={!!this.state.errormessage} onSubmit={this.onsubmit}>
                    <Form.Field>
                    <label>Minimum Contribution</label>
                    <Input 
                        value={this.state.minimumcontribution}
                        onChange={event=>this.setState({minimumcontribution:event.target.value})}
                     label="wei" labelPosition="right" onc></Input>


                    </Form.Field>


                    <Form.Field>
            <label>Campaign Name</label>
            <Input
              value={this.state.campaignName}
              onChange={
                event => this.setState({campaignName: event.target.value})
              }
            />
          </Form.Field>

          <Form.Field>
            <label>Campaign Description</label>
            <Input
              value={this.state.description}
              onChange={
                event => this.setState({description: event.target.value})
              }
            />
          </Form.Field>

          <Form.Field>
            <label>Image Url</label>
            <Input
              value={this.state.imageUrl}
              onChange={
                event => this.setState({imageUrl: event.target.value})
              }
            />
          </Form.Field>

          <Form.Field>
            <label>Target</label>
            <Input
              label="wei"
              labelPosition="right"
              value={this.state.target}
              onChange={
                event => this.setState({target: event.target.value})
              }
            />
          </Form.Field>



                    <Message error header="Opps!Something went wrong" content={this.state.errormessage}></Message>
                    <Button primary loading={this.state.loading}>Create!</Button>

                </Form>

            </Layout>
        );
    }
}


export default CampaignNew;