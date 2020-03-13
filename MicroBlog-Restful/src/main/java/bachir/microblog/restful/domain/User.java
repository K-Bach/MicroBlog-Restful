package bachir.microblog.restful.domain;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;


/**
 * @author Bachir_Karim
 */
@Entity
public class User
{

    @Id
    @GeneratedValue
    private Long id;

    @Basic
    private String name;

    @Basic
    private String password;

    public User()
    {
    }

    public User( String name, String password )
    {
        this.name = name;
        this.password = password;
    }

    public Long getId()
    {
        return id;
    }

    public void setId( Long id )
    {
        this.id = id;
    }

    public String getName()
    {
        return name;
    }

    public void setName( String name )
    {
        this.name = name;
    }

    public String getPassword()
    {
        return password;
    }

    public void setPassword( String password )
    {
        this.password = password;
    }

}
