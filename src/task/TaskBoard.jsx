import { useState } from "react";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";
import AddTaskModal from "./AddTaskModal";

export default function TaskBoard() {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "learn react",
    description: "abcd abcd abcd",
    tags: ["web", "react", "js"],
    priority: "high",
    isFavorite: true,
  };
  const [tasks, setTasks] = useState([defaultTask]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  function handleAddEditTask(newTask, isAdd) {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        })
      );
    }

    setShowAddModal(false);
  }
  function handleCloseClick() {
    setShowAddModal(false);
    setTaskToUpdate(null);
  }
  function handleEditTask(task) {
    console.log("click edit");
    setTaskToUpdate(task);
    setShowAddModal(true);
  }
  function handleDeleteTask(taskId) {
    const taskAfterDelete = tasks.filter((task) => task.id !== taskId);
    setTasks(taskAfterDelete);
  }

  function handleDeleteAllClick() {
    setTasks([...tasks]);
  }
  function handleFavorite(taskId) {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    const newTasks = [...tasks];
    newTasks[taskIndex].isFavorite = !newTasks[taskIndex].isFavorite;
    setTasks(newTasks);
  }
  function handleSearch(searchTerm) {
    console.log(searchTerm);
  }

  return (
    <>
      <section className="mb-20" id="tasks">
        {showAddModal && (
          <AddTaskModal
            onSave={handleAddEditTask}
            onCloseClick={handleCloseClick}
            onDelete={handleDeleteTask}
            taskToUpdate={taskToUpdate}
          />
        )}
        <div className="container">
          <SearchTask onSearch={handleSearch} />
          <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
            <TaskActions
              onAddClick={() => setShowAddModal(true)}
              onDeleteAllClick={handleDeleteAllClick}
            />
            <TaskList
              tasks={tasks}
              onFav={handleFavorite}
              onEdit={handleEditTask}
            />
          </div>
        </div>
      </section>
    </>
  );
}
