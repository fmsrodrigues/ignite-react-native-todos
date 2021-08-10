import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    setTasks([{
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    },...tasks]);
  }

  function handleToggleTaskDone(id: number) {
    setTasks(tasks.map(task => task.id === id ? { ...task, done: true } : task))
    // const taskIndex = tasks.findIndex(task => task.id === id);
    // if(taskIndex >= 0) {
    //   const updatedTasks = [...tasks];
    //   const [task] = updatedTasks.splice(taskIndex, 1);

    //   task.done = true;

    //   setTasks([task, ...updatedTasks]);
    // }

    // // error
  }

  function handleRemoveTask(id: number) {
    setTasks(tasks.filter(task => task.id === id))
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})