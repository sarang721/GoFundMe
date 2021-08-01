import React,{Component} from 'react';
import {Button, Table} from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';


class RequestRow extends Component{

      onapprove=async()=>{

        const accounts=await web3.eth.getAccounts();
        const campaign=await Campaign(this.props.address);
        await campaign.methods.approveRequest(this.props.id).send({
                from:accounts[0]
        })
    }

    finalize=async()=>{
        const accounts=await web3.eth.getAccounts();
        const campaign=await Campaign(this.props.address);
        await campaign.methods.finalizeRequest(this.props.id).send({
            from:accounts[0]
        })

    }

    render(){

        const readytofinalize= this.props.request.approvalCount>this.props.approvercount/2;
        const {Row,Cell}=Table;

        return(

            <Row disabled={this.props.request.complete} positive={readytofinalize && !this.props.request.complete}>
                <Cell>{this.props.id}</Cell>
                <Cell>{this.props.request.description}</Cell>
                <Cell>{web3.utils.fromWei(this.props.request.value,'ether')}</Cell>
                <Cell>{this.props.request.recipient}</Cell>
                <Cell>{this.props.request.approvalCount}/{this.props.approvercount}</Cell>
                <Cell>
                    {
                        this.props.request.complete?null:(
                    <Button color="green"  basic onClick={this.onapprove}>Approve</Button>

                        )
                }           
                    
                    </Cell>
                <Cell>
                    {
                        this.props.request.complete?null:(
                    <Button color="teal" basic onClick={this.finalize}>Finalize</Button>
                        )
                    }   
                    
                    
                    </Cell>
                
            </Row>
        );
    }
}

export default RequestRow;