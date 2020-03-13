/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package bachir.microblog.restful.dao;

import bachir.microblog.restful.domain.User;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.Persistence;
import javax.persistence.TypedQuery;


/**
 *
 * @author Bachir_Karim
 */
public class UserDao
{

    private final EntityManager em;
    String PERSISTENCE_UNIT_NAME = "persistence";

    public UserDao()
    {
        this.em = Persistence.createEntityManagerFactory(PERSISTENCE_UNIT_NAME)
                .createEntityManager();
    }

    public List<User> findAll()
    {
        /* 
        https://docs.oracle.com/javaee/6/tutorial/doc/bnbrg.html       
         */
        TypedQuery<User> typedQuery = em.createQuery("SELECT U FROM USER U", User.class);
        List<User> userList = typedQuery.getResultList();
        return userList;
    }

    public boolean insertUser( User b )
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
        List<User> userList = em.createQuery("SELECT U FROM USER U WHERE U.name LIKE :name AND U.password LIKE :password", User.class
        ).setParameter("name", name).setParameter("password", password).getResultList();
        return !userList.isEmpty();

    }

    public boolean findUserByName( String name )
    {
        TypedQuery<User> typedQuery = em.createQuery("SELECT U FROM USER U WHERE U.name LIKE :name", User.class);
        List<User> userList = typedQuery.setParameter("name", name).getResultList();
        return !userList.isEmpty();

    }
}
