// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract taskContract{
    event AddTask(address reciipient,uint taskId);
    event DeleteTask(uint taskId,bool isDeleted);

    struct Task{
        uint id;
        string tasktext;
        bool isDeleted;
    }

    Task[] private tasks;
    mapping(uint256=>address) taskToOwner;

    // as we donot calling the add task function within the contracy that why we use external keyword
    function addTask(string memory taskText,bool isDeleted) external{
        uint taskId=tasks.length;
        tasks.push(Task(taskId,taskText,isDeleted));
        taskToOwner[taskId]=msg.sender;
        emit AddTask(msg.sender,taskId);
    }

    function deleteTask(uint taskId,bool isDeleted)external{
        require(taskToOwner[taskId]==msg.sender,"you are not the owner of the task");
        tasks[taskId].isDeleted=isDeleted;
        emit DeleteTask(taskId, isDeleted);
    }

    function getMyTask () view external returns(Task[] memory){
        Task[] memory tempo=new Task[](tasks.length);
        uint counter=0;
        for(uint i=0;i<tasks.length;i++){
            require(taskToOwner[i]==msg.sender);
            require(tasks[i].isDeleted==false);

            tempo[counter]=tasks[i];
            counter++;
        }
        Task[] memory result=new Task[](counter);
        for(uint i=0;i<counter;i++){
            result[i]=tempo[i];
        }
        return result;
    }
}
