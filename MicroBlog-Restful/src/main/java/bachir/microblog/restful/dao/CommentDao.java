/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package bachir.microblog.restful.dao;

import bachir.microblog.restful.domain.Comment;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.Persistence;
import javax.persistence.TypedQuery;


/**
 *
 * @author Bachir_Karim
 */
public class CommentDao
{

    private final EntityManager em;
    String PERSISTENCE_UNIT_NAME = "persistence";

    public CommentDao()
    {
        this.em = Persistence.createEntityManagerFactory(PERSISTENCE_UNIT_NAME)
                .createEntityManager();
    }

    public List<Comment> findAll()
    {
        /* 
        https://docs.oracle.com/javaee/6/tutorial/doc/bnbrg.html       
         */
        TypedQuery<Comment> typedQuery = em.createQuery("SELECT C FROM Comment C", Comment.class);
        List<Comment> commentList = typedQuery.getResultList();
        return commentList;
    }

    public List<Comment> findCommentsByPostId( Long postId )
    {
        /* 
        https://docs.oracle.com/javaee/6/tutorial/doc/bnbrg.html       
         */
        TypedQuery<Comment> typedQuery = em.createQuery("SELECT C FROM Comment C WHERE C.idPost = :postId", Comment.class);
        List<Comment> commentList = typedQuery.setParameter("postId", postId).getResultList();
        return commentList;
    }

    public boolean insertComment( Comment c )
    {
        em.getTransaction().begin();
        try
        {
            em.persist(c);
            // -- workaround cache entity manager
            em.flush();
            em.clear();
            // --
            em.getTransaction().commit();

            return true;
        }
        catch( Exception e )
        {
            e.printStackTrace();
            if( em.getTransaction().isActive() )
            {
                em.getTransaction().rollback();
            }
            return false;
        }
    }
}
