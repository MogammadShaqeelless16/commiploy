// screens/Help.js
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import supabase from '../supabaseClient';
import SearchBar from '../component/Help/SearchBar';
import ArticleList from '../component/Help/ArticleList';
import ArticleModal from '../component/Help/ArticleModal';
import Loading from '../component/loadingComponent/loading';

const Help = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [helpArticles, setHelpArticles] = useState([]);
  const [userRole, setUserRole] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [editorContent, setEditorContent] = useState('');
  const [newArticleTitle, setNewArticleTitle] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHelpArticles = async () => {
      const { data, error } = await supabase
        .from('helparticles')
        .select('*');
      if (!error) {
        setHelpArticles(data);
      }
      setLoading(false);
    };

    const fetchUserRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('users')
          .select('roles(role_name)')
          .eq('id', user.id)
          .single();
        if (!error) {
          setUserRole(data.roles.role_name);
        }
      }
    };

    fetchHelpArticles();
    fetchUserRole();
  }, []);

  const handleSearchChange = (text) => {
    setSearchTerm(text.toLowerCase());
  };

  const filteredArticles = helpArticles.filter(article =>
    article.title.toLowerCase().includes(searchTerm)
  );

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setEditorContent(article.content);
    setNewArticleTitle(article.title);
  };

  const handleOverlayClose = () => {
    setSelectedArticle(null);
    setEditorContent('');
    setNewArticleTitle('');
    setShowAddForm(false);
  };

  const handleArticleEdit = async () => {
    if (userRole === 'Administrator' || userRole === 'Developer') {
      const { error } = await supabase
        .from('helparticles')
        .update({ title: newArticleTitle, content: editorContent })
        .eq('id', selectedArticle.id);
      if (!error) {
        setHelpArticles(helpArticles.map(article =>
          article.id === selectedArticle.id ? { ...article, title: newArticleTitle, content: editorContent } : article
        ));
        handleOverlayClose();
      } else {
        Alert.alert('Error', 'Error updating article');
      }
    }
  };

  const handleArticleDelete = async () => {
    if (userRole === 'Administrator' || userRole === 'Developer') {
      const { error } = await supabase
        .from('helparticles')
        .delete()
        .eq('id', selectedArticle.id);
      if (!error) {
        setHelpArticles(helpArticles.filter(article => article.id !== selectedArticle.id));
        handleOverlayClose();
      } else {
        Alert.alert('Error', 'Error deleting article');
      }
    }
  };

  const handleAddArticle = async () => {
    if (userRole === 'Administrator' || userRole === 'Developer') {
      const { error } = await supabase
        .from('helparticles')
        .insert([{ title: newArticleTitle, content: editorContent }]);
      if (!error) {
        const { data, error: fetchError } = await supabase
          .from('helparticles')
          .select('*');
        if (!fetchError) {
          setHelpArticles(data);
          setNewArticleTitle('');
          setEditorContent('');
          setShowAddForm(false);
        }
      } else {
        Alert.alert('Error', 'Error adding article');
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Help Page</Text>
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        showAddForm={showAddForm}
        onAddButtonPress={() => setShowAddForm(!showAddForm)}
        userRole={userRole}
      />
      <ArticleList
        articles={filteredArticles}
        onArticleClick={handleArticleClick}
      />
      <ArticleModal
        visible={selectedArticle !== null || showAddForm}
        onClose={handleOverlayClose}
        article={selectedArticle}
        editorContent={editorContent}
        setEditorContent={setEditorContent}
        newArticleTitle={newArticleTitle}
        setNewArticleTitle={setNewArticleTitle}
        onSave={selectedArticle ? handleArticleEdit : handleAddArticle}
        onDelete={handleArticleDelete}
        userRole={userRole}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default Help;
