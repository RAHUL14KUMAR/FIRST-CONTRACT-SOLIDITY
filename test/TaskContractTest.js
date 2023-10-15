const {expect}=require("chai");
const {ethers}=require("hardhat");

describe('Task Contract',function(){
    let TaskContracts;
    let taskContracts;
    let owner;

    let NUM_TOTAL_TASK=5;
    let totalTasks;

    // this all are hook that are provided

    // before()-> it will run before the first it() or the described block

    // beforeEach()->it will run before each it() or describe statement

    // after->it will run after it() or describe
    
    // it()->it is the test cases;

    this.beforeEach(async function(){
        // we pass the name that we made with contract name i.e present in contract folder
        TaskContracts=await ethers.getContractFactory("taskContract");
        [owner]=await ethers.getSigners();
        taskContracts=await TaskContracts.deploy();

        totalTasks=[];
        for(let i=0;i<NUM_TOTAL_TASK; i++){
            let task={
                taskText:"Task number:-"+i,
                isDeleted:false
            }
            await taskContracts.addTask(task.taskText,task.isDeleted);
            totalTasks.push(task);
        }

    })

    describe("Add Task",function(){
        it("should emit a AddTask event",async function(){
            let task={
                taskText:"New Task",
                isDeleted:false
            }
            await expect(await taskContracts.addTask(task.taskText,task.isDeleted)).to.emit(taskContracts,"AddTask").withArgs(owner.address,NUM_TOTAL_TASK);

            // "AddTask"is similar to contract event "AddTask"
        })
    })

    describe("Get All Tasks",function(){
        it("should return the correct number of totla task",async function(){
            const allMyTask=await taskContracts.getMyTask();
            expect(allMyTask.length).to.equal(NUM_TOTAL_TASK);
        })
    })

    describe("Delete Task",function(){
        it("should emit the DeleteTaskEvent",async function(){
            const TASK_ID=0;
            const TASK_DELETED=true;
            await expect(taskContracts.deleteTask(TASK_ID,TASK_DELETED)).to.emit(taskContracts,"DeleteTask").withArgs(TASK_ID,TASK_DELETED);
        })
    })
})