/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package bachir.microblog.restful.dao;

import bachir.microblog.restful.domain.Post;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.Persistence;
import javax.persistence.TypedQuery;


/**
 *
 * @author Bachir_Karim
 */
public class PostDao
{

    private final EntityManager em;
    String PERSISTENCE_UNIT_NAME = "persistence";

    public PostDao()
    {
        this.em = Persistence.createEntityManagerFactory(PERSISTENCE_UNIT_NAME)
                .createEntityManager();
    }

    public List<Post> findAll()
    {
        /* 
        https://docs.oracle.com/javaee/6/tutorial/doc/bnbrg.html       
         */
        TypedQuery<Post> typedQuery = em.createQuery("SELECT P FROM Post P", Post.class);
        List<Post> personaList = typedQuery.getResultList();
        return personaList;
    }
    public Post findPostById(Long postId)
    {
        /* 
        https://docs.oracle.com/javaee/6/tutorial/doc/bnbrg.html       
         */
        TypedQuery<Post> typedQuery = em.createQuery("SELECT P FROM Post P WHERE P.id = :postId", Post.class);
        Post post = typedQuery.setParameter("postId", postId).getSingleResult();
        return post;
    }

    public boolean insertPost( Post p )
    {
        em.getTransaction().begin();
        try
        {
            em.persist(p);
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
