package bachir.microblog.restful.domain;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;


/**
 * @author Bachir_Karim
 */
@Entity
public class Comment
{

    @Id
    @GeneratedValue
    private Long id;

    @Basic
    private String dataOra;

    @Basic
    private String autore;

    @Basic
    private String testo;

    @Basic
    private Long idPost;

    public Comment()
    {
    }

    public Comment( String dataOra, String testo, String autore, Long idPost )
    {
        this.dataOra = dataOra;
        this.testo = testo;
        this.autore = autore;
        this.idPost = idPost;
    }

    public Long getIdPost()
    {
        return idPost;
    }

    public void setIdPost( Long idPost )
    {
        this.idPost = idPost;
    }

    public Long getId()
    {
        return id;
    }

    public void setId( Long id )
    {
        this.id = id;
    }

    public String getDataOra()
    {
        return dataOra;
    }

    public void setDataOra( String dataOra )
    {
        this.dataOra = dataOra;
    }

    public String getTesto()
    {
        return testo;
    }

    public void setTesto( String testo )
    {
        this.testo = testo;
    }

    public String getAutore()
    {
        return autore;
    }

    public void setAutore( String autore )
    {
        this.autore = autore;
    }

}
