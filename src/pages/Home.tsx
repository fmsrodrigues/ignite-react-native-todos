import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if(tasks.find(task => task.title === newTaskTitle)){
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome');

      return;
    }

    setTasks([{
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    },...tasks]);
  }

  function handleToggleTaskDone(id: number) {
    setTasks(tasks.map(task => task.id === id ? { ...task, done: true } : task))
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?', [{
      onPress: () => { setTasks(tasks.filter(task => task.id === id)) },
      text: 'Sim'
    }, {
      text: 'Não'
    }]);    
  }

  function handleEditTask({ taskId, taskNewTitle  }: { taskId: number, taskNewTitle: string}) {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, title: taskNewTitle } : task))
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
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