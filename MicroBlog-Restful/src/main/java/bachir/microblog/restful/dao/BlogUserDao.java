/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package bachir.microblog.restful.dao;

import bachir.microblog.restful.domain.BlogUser;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.Persistence;
import javax.persistence.TypedQuery;


/**
 *
 * @author Bachir_Karim
 */
public class BlogUserDao
{

    private final EntityManager em;
    String PERSISTENCE_UNIT_NAME = "persistence";

    public BlogUserDao()
    {
        this.em = Persistence.createEntityManagerFactory(PERSISTENCE_UNIT_NAME)
                .createEntityManager();
    }

    public List<BlogUser> findAll()
    {
        /* 
        https://docs.oracle.com/javaee/6/tutorial/doc/bnbrg.html       
         */
        TypedQuery<BlogUser> typedQuery = em.createQuery("SELECT B FROM BlogUser B", BlogUser.class);
        List<BlogUser> userList = typedQuery.getResultList();
        return userList;
    }

    public boolean insertUser( BlogUser b )
    {
        em.getTransaction().begin();
        try
        {
            em.persist(b);
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

    public boolean findUser( String name, String password )
    {
        List<BlogUser> userList = em.createQuery("SELECT B FROM BlogUser B WHERE B.name LIKE :name AND B.password LIKE :password", BlogUser.class
        ).setParameter("name", name).setParameter("password", password).getResultList();
        return !userList.isEmpty();

    }

    public boolean findUserByName( String name )
    {
        TypedQuery<BlogUser> typedQuery = em.createQuery("SELECT B FROM BlogUser B WHERE B.name LIKE :name", BlogUser.class);
        List<BlogUser> userList = typedQuery.setParameter("name", name).getResultList();
        return !userList.isEmpty();

    }
}
